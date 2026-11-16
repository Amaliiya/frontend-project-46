import formatStylish from './stylishFormat.js';
import formatPlain from './plainFormat.js';
import formatJson from './JSONFormat.js'
import { parseFile } from '../src/parsers.js';
import { buildDiff } from '../src/diff.js';

function formatDiff(diff, format) {
  switch (format) {
    case 'plain':
      return formatPlain(diff).join('\n');
    case 'json':
      return formatJson(diff);
    case 'stylish':
    default:
      return formatStylish(diff);
  }
} 
function gendiff(filepath1, filepath2, format = 'stylish') {
  const obj1 = parseFile(filepath1);
  const obj2 = parseFile(filepath2);
  const diff = buildDiff(obj1, obj2);
  return formatDiff(diff, format);
}

export { gendiff, formatDiff }