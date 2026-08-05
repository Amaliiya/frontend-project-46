import _ from 'lodash';
import { union } from 'es-toolkit';
import { parseFile } from '../src/parsers.js';

function buildDiff(obj1, obj2) {
  const keys = _.sortBy(union(Object.keys(obj1), Object.keys(obj2)));

  return keys.map(key => {
    if (!(key in obj1)) {
      return { key, type: 'added', value: obj2[key] };
    }
    if (!(key in obj2)) {
      return { key, type: 'removed', value: obj1[key] };
    }

    const value1 = obj1[key];
    const value2 = obj2[key];

    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return { key, type: 'nested', children: buildDiff(value1, value2) };
    }

    if (value1 === value2) {
      return { key, type: 'unchanged', value: value1 };
    }

    return { key, type: 'changed', oldValue: value1, newValue: value2 };
  });
}

function formatValue(value, depth) {
  if (_.isPlainObject(value)) {
    const indentSize = 4;
    const indent = ' '.repeat(depth * indentSize);
    const entries = Object.entries(value);
    const nestedLines = entries.map(([k, v]) => `${indent}    ${k}: ${formatValue(v, depth + 1)}`);
    return `{\n${nestedLines.join('\n')}\n${indent}}`;
  }
  return value;
}

function formatStylish(diff, depth = 1) {
  const indentSize = 4;
  const leftShift = 2;

  const lines = diff.map(({ key, type, value, children, oldValue, newValue }) => {
    const indent = ' '.repeat(depth * indentSize - leftShift);
    const indentPlain = ' '.repeat(depth * indentSize);

    switch (type) {
      case 'added':
        return `${indent}+ ${key}: ${formatValue(value, depth)}`;
      case 'removed':
        return `${indent}- ${key}: ${formatValue(value, depth)}`;
      case 'unchanged':
        return `${indentPlain}${key}: ${formatValue(value, depth)}`;
      case 'nested':
        return `${indentPlain}${key}: {\n${formatStylish(children, depth + 1)}\n${indentPlain}}`;
      case 'changed':
        return `${indent}- ${key}: ${formatValue(oldValue, depth)}\n${indent}+ ${key}: ${formatValue(newValue, depth)}`;
      default:
        return '';
    }
  });

  // Добавляем внешние скобки только для верхнего уровня
  if (depth === 1) {
    return `{\n${lines.join('\n')}\n}`;
  }
  return lines.join('\n');
}

function gendiff(filepath1, filepath2) {
  const obj1 = parseFile(filepath1);
  const obj2 = parseFile(filepath2);
  const diff = buildDiff(obj1, obj2);
  return diff;
}

export { gendiff, formatStylish };