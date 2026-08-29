import { visit } from 'unist-util-visit'
import type { Plugin } from 'unified'
import type { Root } from 'hast'

const absoluteUrl = /^\/(?!\/)/

function prefixUrl(url: string, base: string): string {
  if (!base || base === '/') return url
  if (!absoluteUrl.test(url)) return url
  if (url === base || url.startsWith(base + '/')) return url
  return `${base}${url}`
}

function prefixSrcset(srcset: string, base: string): string {
  return srcset
    .split(',')
    .map((candidate) => {
      const parts = candidate.trim().split(/\s+/)
      parts[0] = prefixUrl(parts[0], base)
      return parts.join(' ')
    })
    .join(', ')
}

const plugin: Plugin<[string?], Root> = (base = '') => {
  return function transformer(tree) {
    visit(tree, 'element', (el) => {
      const props = el.properties as Record<string, unknown>
      if (props.src && typeof props.src === 'string') {
        props.src = prefixUrl(props.src, base)
      }
      if (props.srcset && typeof props.srcset === 'string') {
        props.srcset = prefixSrcset(props.srcset, base)
      }
      if (props.poster && typeof props.poster === 'string') {
        props.poster = prefixUrl(props.poster, base)
      }
      if (props.href && typeof props.href === 'string' && el.tagName === 'source') {
        props.href = prefixUrl(props.href, base)
      }
    })
    visit(tree, 'raw', (node) => {
      if (typeof node.value !== 'string' || !base || base === '/') return
      node.value = node.value.replace(
        /(\b(?:src|srcset|poster|href)\s*=\s*)(["'])(\/[^"' ]+)(\2)/g,
        (match, lead, quote, url) => {
          if (!absoluteUrl.test(url)) return match
          if (url === base || url.startsWith(base + '/')) return match
          return `${lead}${quote}${base}${url}${quote}`
        },
      )
    })
  }
}

export default plugin
