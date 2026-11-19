// import { diff } from '../src/diff.js'
import _ from 'lodash'

function formatPlainValue(value) {
  if (_.isPlainObject(value) || Array.isArray(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
}

function formatPlain(diff, parentPath = '') {
  const lines = [];

  diff.forEach(({ key, type, value, children, oldValue, newValue }) => {
    const fullPath = parentPath ? `${parentPath}.${key}` : key;

    switch (type) {
      case 'added':
        lines.push(`Property '${fullPath}' was added with value: ${formatPlainValue(value)}`);
        break;
      case 'removed':
        lines.push(`Property '${fullPath}' was removed`);
        break;
      case 'changed':
        lines.push(`Property '${fullPath}' was updated. From ${formatPlainValue(oldValue)} to ${formatPlainValue(newValue)}`);
        break;
      case 'nested':
        lines.push(...formatPlain(children, fullPath));
        break;
    }
  });

  return lines;
}

export default formatPlain 