'use strict';
const fs = require('fs');
const path = require('path');

const dir = path.resolve(process.cwd(), '../_posts/2021');
const reg = `tags: `;
const stringU = `tags: 2021 `;

function func() {
  fs.readdirSync(dir).forEach((file) => {
    let data = fs.readFileSync(`${dir}/${file}`, 'utf-8');

    if (data.includes(reg)) {
      data = data.replace(reg, stringU);
    }
    fs.writeFileSync(`${dir}/${file}`, data, 'utf-8');
  });
}

func();
