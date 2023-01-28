import { Request, Response } from 'express';
// eslint-disable-next-line import/no-extraneous-dependencies
import axiosIns from '../../utils/axios';

export async function getData(req: Request, res: Response): Promise<void> {
  const { data } = await axiosIns.get('api/v1/data');

  const formatData = data.reduce(
    (acc: any, current: any) => {
      let { value, id, type } = current;

      value = value === 'Off' ? false : value === 'On' ? true : value;

      if (acc[type]) {
        const obj = {
          ...acc[type],
          [id]: value,
        };
        return { ...acc, [type]: { ...obj } };
      }
    },
    { switch: {}, slider: {} }
  );

  res.json({ ...formatData });
}
export async function ledControl(req: Request, res: Response): Promise<void> {
  const data = req.body;

  Object.entries(data).forEach(async (led) => {
    let [id, value] = led;
    value = value === true ? 'On' : value === false ? 'Off' : value;
    await axiosIns.post(`/api/v1/${id}`, { [id]: value });
  });

  res.json('success');
}

export default { getData, ledControl };
