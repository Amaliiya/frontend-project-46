import fs from 'node:fs';
import { load } from 'js-yaml';
import path from 'node:path';

function getFormat(filepath) {
  return filepath.split('.').pop();
}

export function parseFile(filepath) {
  const data = fs.readFileSync(filepath, 'utf-8');
  switch (path.extname(filepath)) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
    case '.yaml':
      return load(data);
    default:
      throw new Error(`Unknown format: ${path.extname(filepath)}`);
  }
}