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
  console.log('axios', res);
  return res.data;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  let customLabel;

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
      <div className='border-1 p-2 text-white bg-[#000000d2]'>
        <p className='label'>{customLabel}</p>
        <p>{payload[0].value} Wh</p>
      </div>
    );
  }

  return null;
};

const BarCharts = ({ width, className }: any) => {
  const [dataBar, setDataBar] = useState([]);

  const { status, data, isLoading, isError } = useQuery(
    ['chart'],
    fetchDataBarChart
  );

  useEffect(() => {
    if (!isLoading) {
      setDataBar(data);
      console.log('SET Data Bar');
    }
  }, [data]);

  const widthContainer =
    width > 900 ? width * 0.45 : width < 500 ? width : width * 0.8;
  const barSizeContainer =
    width > 900 ? width * 0.005 : width < 500 ? width * 0.02 : width * 0.008;

  if (isLoading) {
    return <h1 className='text-white title'>Loading...</h1>;
  }
  if (isError) {
    return (
      <h1 className='text-white title'>Error! Please contact the host.</h1>
    );
  }

  return (
    <BarChart
      data={data}
      height={300}
      width={widthContainer * 0.92}
      margin={{
        left: -22,
      }}
      barSize={barSizeContainer}
      className={className}
    >
      <CartesianGrid strokeDasharray='5' stroke='#ffffff2a' vertical={false} />
      <XAxis dataKey='name' />
      <YAxis />
      <Tooltip content={<CustomTooltip />} />
      <Legend />
      <Bar dataKey='Wh' fill='#82ca9d'></Bar>
    </BarChart>
  );
};

export default BarCharts;
