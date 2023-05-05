import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import path, { dirname } from 'path';
import gendiff from '../src/index.js';
import normalizator from '../src/parser.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);
const getFileData = (fileName) => readFileSync(getFixturePath(fileName), 'utf-8');

const filepath1NoDeep = getFixturePath('file1NoDeep.json');
const filepath2NoDeep = getFixturePath('file2NoDeep.json');
const expectedNoDeep = getFileData('expectedNoDeep.txt');

describe('test modules', () => {
  test('normalizator', async () => {
    const expected = {
      host: 'hexlet.io',
      timeout: 50,
      proxy: '123.234.53.22',
      follow: false,
    };
    expect(await normalizator(getFixturePath('file1NoDeep.json'))).toEqual(expected);
  });
});

describe('test gendiff', () => {
  test('noDeep', async () => {
    const actual = await gendiff(filepath1NoDeep, filepath2NoDeep);
    expect(actual).toBe(expectedNoDeep);
  });
});
