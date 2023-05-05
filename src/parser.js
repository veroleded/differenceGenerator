import path from 'path';
import fs from 'fs/promises';

const parsers = {
  '.json': JSON.parse,
};

const normalizator = async (filepath) => {
  const absFilepath = path.resolve(process.cwd(), filepath);

  const parserKey = path.extname(filepath);

  const data = await fs.readFile(absFilepath, 'utf-8').then((value) => parsers[parserKey](value));
  return data;
};
export default normalizator;
