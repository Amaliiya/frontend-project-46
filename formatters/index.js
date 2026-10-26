import formatStylish from './stylishFormat.js';
import formatPlain from './plainFormat.js';

export default function formatDiff(diff, format) {
  switch (format) {
    case 'plain':
      return formatPlain(diff).join('\n');
    case 'json':
      return JSON.stringify(diff, null, 2);
    case 'stylish':
    default:
      return `{\n${formatStylish(diff)}\n}`;
  }
} 