import formatStylish from './stylishFormat.js';
import formatPlain from './plainFormat.js';
import formatJson from './JSONFormat.js'

export default function formatDiff(diff, format) {
  switch (format) {
    case 'plain':
      return formatPlain(diff).join('\n');
    case 'json':
      return formatJson(diff);
    case 'stylish':
    default:
      return `{\n${formatStylish(diff)}\n}`;
  }
} 