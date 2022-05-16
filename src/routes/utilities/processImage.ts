import sharp from 'sharp';

interface ImageParams {
  imageFrom: string;
  imageTo: string;
  width?: number;
  height?: number;
}

//process image in the range of it's dimensions
const processImage = async (image: ImageParams): Promise<null | string> => {
  try {
    await sharp(image.imageFrom)
      .resize(image.width, image.height)
      .jpeg()
      .toFile(image.imageTo);

    return null;
  } catch {
    const dimensions = await sharp(image.imageFrom).metadata();
    return `<p style ="font-size:2.5rem" >image can't be procced, please specify width between<strong> 1 and ${dimensions.width}</strong> and height between <strong>1 and ${dimensions.height}</strong></p>`;
  }
};

export default processImage;
