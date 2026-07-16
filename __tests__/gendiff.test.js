import { gendiff, formatStylish } from '../src/diff.js'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'node:path';
import fs from 'node:fs';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const expectedDiff = fs.readFileSync(getFixturePath('expectedDiff.txt'), 'utf-8');
const expectedEqual = fs.readFileSync(getFixturePath('expectedEqual.txt'), 'utf-8');

test('two different files', () => {
    const file1 = getFixturePath('file1.json');
    const file2 = getFixturePath('file2.json');
    expect(gendiff(file1, file2)).toEqual(expectedDiff)
});

test('two identical files', () => {
    const file1 = getFixturePath('file1.json');
    expect(gendiff(file1, file1)).toEqual(expectedEqual)
});
