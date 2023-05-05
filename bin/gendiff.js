#!/usr/bin/env node

import { program } from 'commander';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0');
// .arguments('<filePath1> <filePath2>')
// .option('-f, --format <type>', 'output format', 'stylish');
// .action((filePath1, filePath2) => {
//   console.log(genDiff(filePath1, filePath2, program.opts().format));
// });
program.parse();
