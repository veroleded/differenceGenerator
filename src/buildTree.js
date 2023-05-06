import _ from 'lodash';

const buildTree = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const unionKeys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(unionKeys);

  const tree = sortedKeys.map((key) => {
    if (!_.has(data1, key)) {
      return {
        key,
        status: 'added',
        value: data2[key],
      };
    }

    if (!_.has(data2, key)) {
      return {
        key,
        status: 'removed',
        value: data1[key],
      };
    }

    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return {
        key,
        status: 'haveChildren',
        value: buildTree(data1[key], data2[key]),
      };
    }

    return data1[key] === data2[key]
      ? { key, status: 'noChanged', value: data1[key] }
      : {
        key,
        status: 'changed',
        valueOld: data1[key],
        valueNew: data2[key],
      };
  });

  return tree;
};

export default buildTree;
