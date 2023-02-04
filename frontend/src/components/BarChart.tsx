import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useQuery, useMutation } from '@tanstack/react-query';
import axiosIns from '../utils/axios';
import { useEffect, useState } from 'react';

const fetchDataBarChart = async () => {
  const res = await axiosIns.get('/api/v1/charts');
  return res.data;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  let customLabel;

  // maybe padStart(2, '0')

  if (label) {
    customLabel =
      label.length === 1
        ? `0${label}:00`
        : label.length === 2
        ? `${label}:00`
        : label;
  }
  if (active && payload && payload.length) {
    return (
      <div className='border-1 bg-[#000000d2] p-2 text-white'>
        <p className='label'>{customLabel}</p>
        <p>{payload[0].value} Wh</p>
      </div>
    );
  }

  return null;
};

const BarCharts = ({ className }: any) => {
  const [dataBar, setDataBar] = useState([]);

  const { status, data, isLoading, isError } = useQuery(
    ['chart', 'Wh'],
    fetchDataBarChart
  );

  useEffect(() => {
    if (!isLoading) {
      setDataBar(data);
    }
  }, [data]);

  if (isLoading) {
    return <h1 className='title text-white'>Loading...</h1>;
  }
  if (isError) {
    return (
      <h1 className='title text-white'>Error! Please contact the host.</h1>
    );
  }

  return (
    <ResponsiveContainer width='100%' height={300}>
      <BarChart
        data={data}
        margin={{
          left: -22,
        }}
        barSize={10}
        className={className}
      >
        <CartesianGrid
          strokeDasharray='5'
          stroke='#ffffff2a'
          vertical={false}
        />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey='Wh' fill='#82ca9d'></Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarCharts;
