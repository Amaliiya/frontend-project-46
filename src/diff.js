import _ from 'lodash';
import { union } from 'es-toolkit';
import { parseFile } from '../src/parsers.js';
import formatDiff from '../formatters/index.js';

function buildDiff(obj1, obj2) {
  const keys = _.sortBy(union(Object.keys(obj1), Object.keys(obj2)));

  return keys.map(key => {
    if (!Object.hasOwn(obj1, key)) {
      return { key, type: 'added', value: obj2[key] };
    }
    if (!Object.hasOwn(obj2, key)) {
      return { key, type: 'removed', value: obj1[key] };
    }

    const value1 = obj1[key];
    const value2 = obj2[key];

    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return { key, type: 'nested', children: buildDiff(value1, value2) };
    }

    if (_.isEqual(value1, value2)) {
      return { key, type: 'unchanged', value: value1 };
    }

    return { key, type: 'changed', oldValue: value1, newValue: value2 };
  });
}


function gendiff(filepath1, filepath2, format = 'stylish') {
  const obj1 = parseFile(filepath1);
  const obj2 = parseFile(filepath2);
  const diff = buildDiff(obj1, obj2);
  return formatDiff(diff, format);
}

export { gendiff, buildDiff };