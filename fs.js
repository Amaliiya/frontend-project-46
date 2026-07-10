import * as fs from 'node:fs';

export function parseFile(filepath) {
  const content = fs.readFileSync(filepath, 'utf-8');
  return JSON.parse(content);
}
