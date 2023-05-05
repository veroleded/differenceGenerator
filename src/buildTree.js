import _ from 'lodash';

const buildTree = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const unionKeys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(unionKeys);

  const result = sortedKeys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];
    let line = '';

    if (_.has(data1, key) && _.has(data2, key)) {
      line = value1 === value2
        ? `    ${key}: ${value1}`
        : `  - ${key}: ${value1}\n  + ${key}: ${value2}`;
    } else if (_.has(data1, key) && !_.has(data2, key)) {
      line = `  - ${key}: ${value1}`;
    } else {
      line = `  + ${key}: ${value2}`;
    }

    return line;
  });

  return `{\n${result.join('\n')}\n}`;
};

export default buildTree;
