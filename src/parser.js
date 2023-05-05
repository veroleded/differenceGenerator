import path from 'path';
import fs from 'fs/promises';

const normalizator = async (filepath) => {
  const absFilepath = path.resolve(process.cwd(), filepath);
  const data = await fs.readFile(absFilepath, 'utf-8').then((value) => JSON.parse(value));
  return data;
};
export default normalizator;
