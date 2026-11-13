import { gendiff } from '../src/diff.js'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'node:path';
import fs from 'node:fs';
import { test, expect } from '@jest/globals';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const expectedDiff = fs.readFileSync(getFixturePath('expectedDiff.txt'), 'utf-8');
const expectedEqual = fs.readFileSync(getFixturePath('expectedEqual.txt'), 'utf-8');
const expectedPlain = fs.readFileSync(getFixturePath('expectedPlain.txt'), 'utf-8');
const expectedJSON = fs.readFileSync(getFixturePath('expectedJSON.json'), 'utf-8');

test('different yml files', () => {
    const file1 = getFixturePath('file1.yml');
    const file2 = getFixturePath('file2.yml');
    expect(gendiff(file1, file2, 'stylish')).toEqual(expectedDiff);
});

test('identical yml files', () => {
    const file1 = getFixturePath('file1.yml');
    expect(gendiff(file1, 'stylish')).toEqual(expectedEqual);
});

test('different json files', () => {
    const file1 = getFixturePath('file1.json');
    const file2 = getFixturePath('file2.json');
    expect(gendiff(file1, file2, 'stylish')).toEqual(expectedDiff);
});

test('identical json files', () => {
    const file1 = getFixturePath('file1.json');
    expect(gendiff(file1, file2, 'stylish')).toEqual(expectedEqual);
});

test('plain format', () => {
    const file1 = getFixturePath('file1.json');
    const file2 = getFixturePath('file2.json');
    expect(gendiff(file1, file2, 'plain')).toEqual(expectedPlain);
});

test('json format', () => {
    const file1 = getFixturePath('file1.json');
    const file2 = getFixturePath('file2.json');
    expect(gendiff(file1, file2, 'json')).toEqual(expectedJSON);
});