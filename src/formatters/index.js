import stylish from './stylish.js';
import plain from './plain.js';

export default {
  stylish,
  plain,
  json: (tree) => JSON.stringify(tree, null, 2),
};
