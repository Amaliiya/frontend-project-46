import { parseFile } from './parsers.js';
import { buildDiff } from './diff.js';
import { formatDiff } from '../formatters/index.js';

export function gendiff(filepath1, filepath2, format = 'stylish') {
  const obj1 = parseFile(filepath1);
  const obj2 = parseFile(filepath2);
  const diff = buildDiff(obj1, obj2);
  return formatDiff(diff, format);
}