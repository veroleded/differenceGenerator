import _ from 'lodash';
import normalizator from './normalizator.js';
import buildTree from './buildTree.js';
import formatters from './formatters/index.js';

const gendiff = async (filepath1, filepath2, format = 'stylish') => {
  const [data1, data2] = await Promise.all(
    [
      normalizator(filepath1),
      normalizator(filepath2),
    ],
  );

  const tree = buildTree(data1, data2);
  if (_.has(formatters, format)) {
    return formatters[format](tree);
  }
  throw new Error('Incorrect format.');
};

export default gendiff;
