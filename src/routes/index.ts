import express from 'express';
import { validate } from './utilities/middleware';
import { createThumbedImage } from './utilities/image';
const routes = express.Router();

routes.get('/api/image', validate, async (req, res) => {
  //try make the thumb image and response with it or send an error message
  try {
    const response = await createThumbedImage(req.query);

    if (response.type === 'success') {
      const thumbName = `${req.query.filename}_${req.query.width}-${req.query.height}.jpg`;

      return res.sendFile(`/${thumbName}`, { root: 'src/public/thumb' });
    } else if (response.type === 'error') {
      return res.send(response.data);
    }
  } catch {
    return res.send('what did you do dude :|');
  }
});

export default routes;
