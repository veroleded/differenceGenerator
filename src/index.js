import normalizator from './parser.js';
import buildTree from './buildTree.js';

const gendiff = async (filepath1, filepath2) => {
  const [data1, data2] = await Promise.all(
    [
      normalizator(filepath1),
      normalizator(filepath2),
    ],
  );

  const result = buildTree(data1, data2);

  return result;
};

export default gendiff;
