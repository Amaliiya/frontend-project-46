import _ from 'lodash';

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

  if (depth === 1) {
    return `{\n${lines.join('\n')}\n}`;
  }
  return lines.join('\n');
}

export default formatStylish