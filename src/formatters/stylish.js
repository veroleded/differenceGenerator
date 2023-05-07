import _ from 'lodash';

const intendCalc = (deth, specSymbol) => {
  const indentForStart = `${'    '.repeat(deth)}  ${specSymbol}`;
  return indentForStart;
};

// deep, recursive conversion to a string of unchanged children
const stringify = (data, depth) => {
  const specSymbol = '  ';
  if (!_.isObject(data)) {
    return `${data}`;
  }
  const indentForStart = intendCalc(depth, specSymbol);

  const str = Object.entries(data).map(([key, value]) => (
    `${indentForStart}${key}: ${stringify(value, depth + 1)}`
  ));
  const indentForBrecket = '    '.repeat(depth);

  return `{\n${str.join('\n')}\n${indentForBrecket}}`;
};

const nodeHandler = (key, value, depth, valueHandler, specSymbol) => {
  const indentForStart = intendCalc(depth, specSymbol);

  return `${indentForStart}${key}: ${valueHandler(value, depth + 1)}`;
};

const stylish = (globalTree) => {
  const handler = (tree, depth) => {
    const nodeHandlers = {
      added: (node) => {
        const specSymbol = '+ ';
        return nodeHandler(node.key, node.value, depth, stringify, specSymbol);
      },

      removed: (node) => {
        const specSymbol = '- ';
        return nodeHandler(node.key, node.value, depth, stringify, specSymbol);
      },

      noChanged: (node) => {
        const specSymbol = '  ';
        return nodeHandler(node.key, node.value, depth, stringify, specSymbol);
      },

      changed: (node) => {
        const specSymbolForOld = '- ';
        const specSymbolForNew = '+ ';
        const strOld = nodeHandler(node.key, node.valueOld, depth, stringify, specSymbolForOld);
        const strNew = nodeHandler(node.key, node.valueNew, depth, stringify, specSymbolForNew);

        return [strOld, strNew].join('\n');
      },

      haveChildren: (node) => {
        const specSymbol = '  ';
        return nodeHandler(node.key, node.value, depth, handler, specSymbol);
      },
    };

    const str = tree.map((node) => nodeHandlers[node.status](node, depth));
    const intendForBrecket = '    '.repeat(depth);

    return `{\n${str.join('\n')}\n${intendForBrecket}}`;
  };

  return handler(globalTree, 0);
};

export default stylish;
