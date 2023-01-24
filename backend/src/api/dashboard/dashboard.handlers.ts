import { Request, Response } from 'express';
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';

export async function getData(req: Request, res: Response): Promise<void> {
  const { data } = await axios.get('http://192.168.0.124:1880/api/v1/data');

  res.json(data);
}
export async function ledControl(req: Request, res: Response): Promise<void> {
  const key = Object.keys(req.body);
  const value = Object.values(req.body);

  await axios.post(`http://192.168.0.124:1880/api/v1/led${key[0]}`, value);

  res.json('success');
}

export default { getData, ledControl };
