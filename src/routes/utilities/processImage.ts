import sharp from 'sharp';

interface ImageParams {
  imageFrom: string;
  imageTo: string;
  width?: number;
  height?: number;
}

interface ObjectData {
  data: string;
  type: string;
}

//process image in the range of it's dimensions
//@return image path when successfuly created or return error message
const processImage = async (image: ImageParams): Promise<ObjectData> => {
  try {
    await sharp(image.imageFrom)
      .resize(image.width, image.height)
      .jpeg()
      .toFile(image.imageTo);

    return { data: image.imageTo.slice(4), type: 'success' };
  } catch {
    const dimensions = await sharp(image.imageFrom).metadata();
    return {
      data: `<p style ="font-size:2.5rem" >image can't be procced, please specify width between<strong> 1 and ${dimensions.width}</strong> and height between <strong>1 and ${dimensions.height}</strong></p>`,
      type: 'error',
    };
  }
};

export default processImage;
