import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import path, { dirname } from 'path';
import gendiff from '../src/index.js';
import normalizator from '../src/normalizator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);
const getFileData = async (fileName) => {
  const result = await fs.readFile(getFixturePath(fileName), 'utf-8');
  return result;
};

describe('test modules', () => {
  test('normalizator', async () => {
    const expected = {
      host: 'hexlet.io',
      timeout: 50,
      proxy: '123.234.53.22',
      follow: false,
    };
    expect(await normalizator(getFixturePath('file1NoDeep.yaml'))).toEqual(expected);
    expect(await normalizator(getFixturePath('file1NoDeep.json'))).toEqual(expected);
  });
});

describe('test gendiff', () => {
  test('no Deep', async () => {
    const filepath1 = getFixturePath('file1NoDeep.json');
    const filepath2 = getFixturePath('file2NoDeep.yml');
    const expected = await getFileData('expectedNoDeep.txt');

    const actual = await gendiff(filepath1, filepath2);

    expect(actual).toBe(expected);
  });

  test('deep stylish', async () => {
    const filepath1 = getFixturePath('file1Deep.json');
    const filepath2 = getFixturePath('file2Deep.json');
    const expected = await getFileData('expectedDeep.txt');

    const actual = await gendiff(filepath1, filepath2);

    expect(actual).toBe(expected);
  });

  test('deep plain', async () => {
    const filepath1 = getFixturePath('file1Deep.json');
    const filepath2 = getFixturePath('file2Deep.json');
    const expected = await getFileData('expectedDeepPlain.txt');

    const actual = await gendiff(filepath1, filepath2, 'plain');

    expect(actual).toBe(expected);
  });

  test('deep json', async () => {
    const filepath1 = getFixturePath('file1Deep.json');
    const filepath2 = getFixturePath('file2Deep.json');
    const expected = await getFileData('expectedDeepJson.json');

    const actual = await gendiff(filepath1, filepath2, 'json');

    expect(actual).toBe(expected);
  });
});
