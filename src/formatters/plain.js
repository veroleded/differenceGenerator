import _ from 'lodash';

const getValue = (data) => {
  if (_.isObject(data)) {
    return '[complex value]';
  }
  return _.isString(data) ? `'${data}'` : `${data}`;
};

const plain = (globalTree) => {
  if (!_.isArray(globalTree)) {
    return `${globalTree}`;
  }
  const handler = (tree, valuePath = '') => {
    const lines = tree.flatMap((node) => {
      const nextValuePath = `${valuePath}${node.key}.`;
      switch (node.status) {
        case 'removed':
          return `Property '${valuePath}${node.key}' was removed`;

        case 'added':
          return `Property '${valuePath}${node.key}' was added with value: ${getValue(node.value)}`;

        case 'changed':
          return `Property '${valuePath}${node.key}' was updated. From ${getValue(node.valueOld)} to ${getValue(node.valueNew)}`;

        case 'haveChildren':
          return handler(node.value, nextValuePath);

        case 'noChanged':
          return [];

        default:
          throw new Error(`Type: ${node.status} is unknown.`);
      }
    });

    return lines.join('\n');
  };

  return handler(globalTree);
};

export default plain;
