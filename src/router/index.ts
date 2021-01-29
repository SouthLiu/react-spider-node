import { Router } from 'express';
import Analyzer from '../utils/analyzer';

const router = Router();

router.get('/', (require, response) => {
  response.send('asd');
})

router.post('/analzer', (require, response) => {
  const { url } = require.body;
  if (url) {
    new Analyzer(url);
    response.send('url正确')
  } else {
    response.send('url 不正确')
  }
})


export default router;