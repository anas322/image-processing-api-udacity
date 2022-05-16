import fs from 'fs';
import processImage from './processImage';
const imageFilePath = 'src/public/full';
const imageThumbPath = 'src/public/thumb';

interface QueryParams {
  filename?: string;
  width?: string;
  height?: string;
}

const checkIfImageExist = (filename: string): boolean => {
  return fs.existsSync(`${imageFilePath}/${filename}.jpg`);
};

const checkIfThumbExist = (query: QueryParams): boolean | string => {
  const filename = query.filename;
  const width = query.width;
  const height = query.height;

  const fullName = `${filename}_${width}-${height}`; //image full name

  return fs.existsSync(`${imageThumbPath}/${fullName}.jpg`) ? fullName : false;
};

const getAllImagesNames = (): string[] => {
  const names = fs.readdirSync(imageFilePath).map((item: string): string => {
    const indexOfDotSymbol: number = item.lastIndexOf('.');
    return item.substring(0, indexOfDotSymbol);
  });

  return names;
};

const createThumbedImage = async (
  query: QueryParams
): Promise<null | string> => {
  const imageFrom = `${imageFilePath}/${query.filename}.jpg`;
  const thumbName = `${query.filename}_${query.width}-${query.height}.jpg`;
  const imageTo = `${imageThumbPath}/${thumbName}`;

  return await processImage({
    imageFrom,
    imageTo,
    width: parseInt(query.width as string),
    height: parseInt(query.height as string),
  });
};

export {
  checkIfImageExist,
  getAllImagesNames,
  checkIfThumbExist,
  createThumbedImage,
};
