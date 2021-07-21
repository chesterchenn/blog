#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');

const dir = path.resolve(process.cwd(), '_posts');
const reg = `---`;
const stringU = `---\nlayout: post`;
const stringA = `---\nlayout: post\n---\n`

function func() {
  fs.readdirSync(dir).forEach(sub => {
    const subDir = path.resolve(dir, sub);
    fs.readdirSync(subDir).forEach(file => {
      let data = fs.readFileSync(`${subDir}/${file}`, 'utf-8');

      if (data.includes(reg)) {
        data = data.replace(reg, stringU)
      } else {
        data = stringA.concat(data);
      }
      fs.writeFileSync(`${subDir}/${file}`, data, 'utf-8');
    })
  })
}

func();