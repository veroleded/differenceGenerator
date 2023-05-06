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

const stylish = (globalTree) => {
  const hundler = (tree, depth) => {
    const str = tree.map((node) => {
      switch (node.status) {
        case 'added': {
          const specSymbol = '+ ';
          const indentForStart = intendCalc(depth, specSymbol);

          return `${indentForStart}${node.key}: ${stringify(node.value, depth + 1)}`;
        }

        case 'removed': {
          const specSymbol = '- ';
          const indentForStart = intendCalc(depth, specSymbol);

          return `${indentForStart}${node.key}: ${stringify(node.value, depth + 1)}`;
        }

        case 'noChanged': {
          const specSymbol = '  ';
          const indentForStart = intendCalc(depth, specSymbol);

          return `${indentForStart}${node.key}: ${stringify(node.value, depth + 1)}`;
        }

        case 'changed': {
          const specSymbolForOld = '- ';
          const specSymbolForNew = '+ ';
          const intendForOld = intendCalc(depth, specSymbolForOld);
          const intendForNew = intendCalc(depth, specSymbolForNew);

          const strOld = (
            `${intendForOld}${node.key}: ${stringify(node.valueOld, depth + 1)}`
          );
          const strNew = (
            `${intendForNew}${node.key}: ${stringify(node.valueNew, depth + 1)}`
          );

          return [strOld, strNew].join('\n');
        }

        case 'haveChildren': {
          const specSymbol = '  ';
          const indentForStart = intendCalc(depth, specSymbol);
          return `${indentForStart}${node.key}: ${hundler(node.value, depth + 1)}`;
        }

        default:
          throw new Error('No such status exists');
      }
    });

    const intendForBrecket = '    '.repeat(depth);
    return `{\n${str.join('\n')}\n${intendForBrecket}}`;
  };

  return hundler(globalTree, 0);
};

export default stylish;
