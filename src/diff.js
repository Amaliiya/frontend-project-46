import _ from 'lodash'
import { union } from 'es-toolkit';
import { parseFile } from '../fs.js';

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
  return formatStylish(result)
}

export { gendiff, formatStylish }