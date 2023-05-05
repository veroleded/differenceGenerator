import normalizator from './parser.js';
import buildTree from './buildTree.js';

const gendiff = async (filepath1, filepath2) => {
  const [data1, data2] = await Promise.all(
    [
      normalizator(filepath1),
      normalizator(filepath2),
    ],
  );

  console.log(buildTree(data1, data2));
};

gendiff('__fixtures__/file1.json', '/Users/veroled/projects/differenceGenerator/__fixtures__/file2.json');
