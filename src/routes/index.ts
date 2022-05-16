import express from 'express';
import { validate } from './utilities/middleware';
import { createThumbedImage } from './utilities/image';
const routes = express.Router();

routes.get('/', validate, async (req, res) => {
  const response = await createThumbedImage(req.query);

  if (response) {
    return res.send(response);
  }
});

export default routes;
