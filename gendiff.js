#!/usr/bin/env node
import { Command } from 'commander';
import path from 'node:path';
import { cwd } from 'node:process';
import { parseFile } from './fs.js';
import _ from 'lodash'
import { union } from 'es-toolkit';
const program = new Command();

function gendiff(filepath1, filepath2) {
  const obj1 = parseFile(filepath1);
  const obj2 = parseFile(filepath2);
  const keys = _.sortBy(union(Object.keys(obj1), Object.keys(obj2)));
  const result = {};

  for (const key of keys) {
    if (!(key in obj1)) {
      result[key] = { type: 'added', value: obj2[key] };
    } else if (!(key in obj2)) {
      result[key] = { type: 'removed', value: obj1[key] };
    } else if (obj1[key] === obj2[key]) {
      result[key] = { type: 'unchanged', value: obj1[key] };
    } else {
      result[key] = { type: 'changed', oldValue: obj1[key], newValue: obj2[key] };
    }
  }
  return result
}
function formatStylish(diff) {
  const lines = Object.entries(diff).map(([key, info]) => {
    switch (info.type) {
      case 'added':
        return `  + ${key}: ${info.value}`;
      case 'removed':
        return `  - ${key}: ${info.value}`;
      case 'unchanged':
        return `    ${key}: ${info.value}`;
      case 'changed':
        return `  - ${key}: ${info.oldValue}\n  + ${key}: ${info.newValue}`;
    }
  })

  return `{\n${lines.join('\n')}\n}`;
}
program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2) => {
    let fullPath1 = path.resolve(filepath1)
    let fullPath2 = path.resolve(filepath2)
    const diff = gendiff(fullPath1, fullPath2);
    console.log(formatStylish(diff));
  })
  
program.parse();