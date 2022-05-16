import express from 'express';
import {
  checkIfImageExist,
  getAllImagesNames,
  checkIfThumbExist,
} from '../utilities/image';

export const validate = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const filename = req.query.filename as unknown as string;
  const width = parseInt(req.query.width as string);
  const height = parseInt(req.query.height as string);

  //check if filename exist
  if (!filename) {
    return res.send(
      'please select a filename, width and height of the image appropriately'
    );
  }

  //check if image not exit
  if (!checkIfImageExist(filename)) {
    const names = getAllImagesNames().join(' - ');

    return res.send(
      `please select filename of one of these names: <strong>${names}</strong> `
    );
  }

  //display original image if no dimensions available
  if (!width && !height) {
    return res.sendFile(`public/full/${filename}.jpg`, { root: 'src' });
  }

  //check width validation

  if (width < 1 || isNaN(width)) {
    return res.send('please specify a valid width greater than 1');
  }

  //check height validation
  if (height < 1 || isNaN(height)) {
    return res.send('please specify a valid height greater than 1');
  }

  //check if thumb exist
  if (checkIfThumbExist(req.query)) {
    return res.sendFile(`public/thumb/${checkIfThumbExist(req.query)}.jpg`, {
      root: 'src',
    });
  }

  next();
};
