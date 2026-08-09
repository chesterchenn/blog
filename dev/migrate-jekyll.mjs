import fs from "fs";
import path from "path";

const JEKYLL_POSTS = "/home/chen/Code/blog/_posts";
const ASTRO_POSTS = "/home/chen/Code/my-new-blog/src/content/posts";

// Build date→slug map for internal link resolution
function buildSlugMap() {
  const slugMap = new Map();
  const years = fs.readdirSync(JEKYLL_POSTS).filter((y) => /^\d{4}$/.test(y));
  for (const year of years) {
    const dir = path.join(JEKYLL_POSTS, year);
    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
    for (const file of files) {
      const match = file.match(/^(\d{4}-\d{2}-\d{2})-(.+)\.md$/);
      if (match) {
        slugMap.set(match[1], match[2]);
      }
    }
  }
  return slugMap;
}

function parseFrontmatter(content) {
  const fmRegex = /^---\r?\n([\s\S]*?)\r?\n---/;
  const match = content.match(fmRegex);
  if (!match) return { frontmatter: {}, body: content };

  const fmStr = match[1];
  const fm = {};

  for (const line of fmStr.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const colonIdx = trimmed.indexOf(":");
    if (colonIdx === -1) continue;
    const key = trimmed.slice(0, colonIdx).trim();
    let value = trimmed.slice(colonIdx + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    fm[key] = value;
  }

  return { frontmatter: fm, body: content.slice(match[0].length) };
}

function convertContent(body, slugMap) {
  // 1. Markdown images with optional title: ![alt]({{ "images/file" | relative_url }} "title")
  body = body.replace(
    /(!\[([^\]]*)\])\(\{\{\s*["']([^"']+)["']\s*\|\s*relative_url\s*\}\}\s*("[^"]*")?\)/g,
    (_, imgPrefix, alt, imgPath, title) => {
      return title ? `${imgPrefix}(/${imgPath} ${title})` : `${imgPrefix}(/${imgPath})`;
    },
  );

  // 2. Markdown reference-style link definitions: [ref]: {{ 'images/file' | relative_url }}
  body = body.replace(
    /^(\[[^\]]+\]:\s*)\{\{\s*["']([^"']+)["']\s*\|\s*relative_url\s*\}\}/gm,
    (_, prefix, imgPath) => `${prefix}/${imgPath}`,
  );

  // 3. HTML img: <img src="{{ 'images/file' | relative_url}}" ...> (no space before }})
  body = body.replace(
    /src=\{\{\s*["']([^"']+)["']\s*\|\s*relative_url\s*\}\}/g,
    (_, imgPath) => `src="/${imgPath}"`,
  );

  // 4. Fix relative image paths: ../../../images/ → /images/
  body = body.replace(/(\.\.\/)+images\//g, "/images/");

  // 5. Remove Kramdown image attributes: ){:height="300px" class="img--center"}
  body = body.replace(/\)\{:[^}]+\}/g, ")");

  // 5. Internal post links: [text]({{ "YYYY/MM/DD/slug.html" | relative_url }})
  body = body.replace(
    /\[([^\]]*)\]\(\{\{\s*["']([^"']+)["']\s*\|\s*relative_url\s*\}\}\)/g,
    (match, text, linkPath) => {
      const pathMatch = linkPath.match(/^(\d{4})\/(\d{2})\/(\d{2})\/(.+)\.html?$/);
      if (pathMatch) {
        const dateStr = `${pathMatch[1]}-${pathMatch[2]}-${pathMatch[3]}`;
        const slug = slugMap.get(dateStr);
        if (slug) {
          return `[${text}](/posts/${slug})`;
        }
      }
      return `[${text}](/${linkPath})`;
    },
  );

  return body;
}

function migrate() {
  if (!fs.existsSync(ASTRO_POSTS)) {
    fs.mkdirSync(ASTRO_POSTS, { recursive: true });
  }

  const slugMap = buildSlugMap();
  console.log(`Slug map: ${slugMap.size} entries`);

  const years = fs.readdirSync(JEKYLL_POSTS).filter((y) => /^\d{4}$/.test(y));
  let migrated = 0;
  let conflicts = [];

  for (const year of years) {
    const yearDir = path.join(JEKYLL_POSTS, year);
    const files = fs.readdirSync(yearDir).filter((f) => f.endsWith(".md"));

    for (const file of files) {
      const filePath = path.join(yearDir, file);
      const content = fs.readFileSync(filePath, "utf-8");

      // Parse filename
      const filenameMatch = file.match(/^(\d{4}-\d{2}-\d{2})-(.+)\.md$/);
      if (!filenameMatch) {
        console.warn(`  SKIP (bad filename): ${file}`);
        continue;
      }
      const dateStr = filenameMatch[1];
      let slug = filenameMatch[2];

      // Parse Jekyll frontmatter
      const { frontmatter, body } = parseFrontmatter(content);
      const title = frontmatter.title || slug;
      const tagsStr = frontmatter.tags || "";
      const tags = tagsStr
        .split(/\s+/)
        .filter((t) => t && !/^\d{4}$/.test(t));

      // Build Astro frontmatter
      const lines = ["---"];
      lines.push(`title: "${title.replace(/"/g, '\\"')}"`);
      lines.push(`published: ${dateStr}`);
      if (tags.length > 0) {
        lines.push(`tags: [${tags.map((t) => `"${t}"`).join(", ")}]`);
      }
      lines.push("---");

      const newFrontmatter = lines.join("\n");
      const newBody = convertContent(body, slugMap);
      const newContent = newFrontmatter + newBody;

      // Handle filename conflicts
      const outputFile = `${slug}.md`;
      const outputPath = path.join(ASTRO_POSTS, outputFile);

      if (fs.existsSync(outputPath)) {
        conflicts.push({ slug, year, file });
        const altOutputFile = `${slug}-${dateStr.replace(/-/g, "")}.md`;
        const altOutputPath = path.join(ASTRO_POSTS, altOutputFile);
        fs.writeFileSync(altOutputPath, newContent, "utf-8");
        console.log(`  CONFLICT → ${altOutputFile} (${year})`);
      } else {
        fs.writeFileSync(outputPath, newContent, "utf-8");
      }
      migrated++;
    }
  }

  console.log(`\nMigrated ${migrated} posts to ${ASTRO_POSTS}`);
  if (conflicts.length > 0) {
    console.log(`\n${conflicts.length} filename conflicts (renamed with date suffix):`);
    conflicts.forEach((c) => console.log(`  ${c.slug} (${c.year}/${c.file})`));
  }
}

migrate();
