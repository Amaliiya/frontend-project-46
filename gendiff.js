#!/usr/bin/env node
import { Command } from 'commander';
import path from 'node:path';
import { gendiff, formatStylish } from './src/diff.js'
const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2) => {
    let fullPath1 = path.resolve(filepath1)
    let fullPath2 = path.resolve(filepath2)
    const diff = gendiff(fullPath1, fullPath2);
    console.log(formatStylish(diff));
  })
  
program.parse();