#!/usr/bin/env node
import { Command } from 'commander';
import path from 'node:path';
import { cwd } from 'node:process';
import { parseFile } from './fs.js';
const program = new Command();

function gendiff(filepath1, filepath2, format) {
  let file1 = parseFile(filepath1);
  let file2 = parseFile(filepath2);
  return [file1, file2];
}
program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2, options) => {
    let fullPath1 = path.resolve(filepath1)
    let fullPath2 = path.resolve(filepath2)
    console.log(gendiff(fullPath1, fullPath2, options.format))
  })
  
program.parse();