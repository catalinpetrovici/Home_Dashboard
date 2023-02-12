import BarCharts from '../components/BarChart';
import LineCharts from '../components/LineCharts';
import { useRef } from 'react';
import axiosIns from '../utils/axios';
import { QueryClient } from '@tanstack/react-query';
import { useLoaderData } from 'react-router-dom';

const fetchDataBarChart = async () => {
  const res = await axiosIns.get('/api/v1/charts');
  return res.data;
};

const fetchDataLineChart = async () => {
  const res = await axiosIns.get('/api/v1/temp');
  return res.data;
};

type Bars = { name: string; Wh: number };
type Lines = {
  hum: string;
  label: { temp: string; hum: string };
  temp: string;
  time: string;
};

type Data = [Bars[], Lines[]];

const BookList = () => {
  const ref = useRef<HTMLDivElement>(null);
  const data = useLoaderData() as Data;

  return (
    <div ref={ref} className=''>
      <h1 className='title text-white'>Temp & Hum</h1>
      <div className='flex flex-col lg:flex-row'>
        <section className='flex-1'>
          <div className='test lg:mr-5'>
            <span className='mb-2 block'>Power Consumption</span>
            <BarCharts data={data[0]} />
          </div>
        </section>
        <section className='flex-1'>
          <div className='test'>
            <span className='mb-2 block'>Temp & Hum</span>
            <LineCharts data={data[1]} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default BookList;

export function loader(queryClient: QueryClient) {
  return async () => {
    const bars = queryClient.fetchQuery({
      queryKey: ['chart', 'Wh'],
      queryFn: fetchDataBarChart,
      staleTime: 1000 * 60 * 2,
    });
    const line = queryClient.fetchQuery({
      queryKey: ['chart', 'tempHum'],
      queryFn: fetchDataLineChart,
      staleTime: 1000 * 60 * 2,
    });
    if (bars && line) return Promise.all([bars, line]);

    return queryClient.fetchQuery({
      queryKey: ['temp', 'now'],
      queryFn: () => {},
    });
  };
}
