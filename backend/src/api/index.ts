import express from 'express';
import axios from 'axios';

// import MessageResponse from '../interfaces/MessageResponse';
import emojis from './emojis';

const router = express.Router();

router.get<{}, {}>('/', async (req, res) => {
  const { data } = await axios.get('http://192.168.0.124:1880/api/v1/data');

  res.json(data);
});

router.post<{}, {}>('/led', async (req, res) => {
  console.log(req.body);

  const key = Object.keys(req.body);
  const value = Object.values(req.body);

  console.log(key, value);

  await axios.post(`http://192.168.0.124:1880/api/v1/led${key[0]}`, value);

  res.json('success');
});

router.use('/emojis', emojis);

export default router;
