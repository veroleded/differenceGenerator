import normalizator from './normalizator.js';
import buildTree from './buildTree.js';
import stylish from './formatters/stylish.js';

const formatters = {
  stylish,
};

const gendiff = async (filepath1, filepath2, formatter = 'staylish') => {
  const [data1, data2] = await Promise.all(
    [
      normalizator(filepath1),
      normalizator(filepath2),
    ],
  );

  const tree = buildTree(data1, data2);

  return formatters[formatter](tree);
};

export default gendiff;
