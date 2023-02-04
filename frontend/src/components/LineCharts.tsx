import { useEffect, useState } from 'react';
import axiosIns from '../utils/axios';
import { useQuery } from '@tanstack/react-query';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Brush,
  ResponsiveContainer,
} from 'recharts';

const fetchDataBarChart = async () => {
  const res = await axiosIns.get('/api/v1/temp');
  return res.data;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  let custom;

  if (payload[0]) {
    custom =
      payload[0].dataKey === 'temp'
        ? '°C'
        : payload[0].dataKey === 'hum'
        ? '%'
        : payload[0].dataKey;
  }

  if (active && payload && payload.length) {
    return (
      <div className='border-1 bg-[#000000d2] p-2 text-white'>
        <p className='label'>{label}</p>
        <p>
          {payload[0].value} {custom}
        </p>
      </div>
    );
  }

  return null;
};

const LineCharts = ({ className }: any) => {
  const [dataLine, setDataLine] = useState([]);

  const { status, data, isLoading, isError } = useQuery(
    ['chart', 'tempHum'],
    fetchDataBarChart
  );

  useEffect(() => {
    if (!isLoading) {
      setDataLine(data);
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
    <>
      <ResponsiveContainer width='100%' height={300}>
        <LineChart
          data={dataLine}
          margin={{
            left: -30,
          }}
          syncId='time'
        >
          <CartesianGrid
            strokeDasharray='3'
            vertical={false}
            stroke='#ffffff2a'
          />
          <XAxis dataKey='time' />
          <YAxis ticks={[0, 10, 15, 20, 25, 30]} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line type='monotone' dataKey='temp' stroke='#d42d2d' dot={<></>} />
        </LineChart>
      </ResponsiveContainer>
      <ResponsiveContainer width='100%' height={300}>
        <LineChart
          data={dataLine}
          height={300}
          width={300}
          margin={{
            left: -30,
          }}
          syncId='time'
        >
          <CartesianGrid
            strokeDasharray='3'
            vertical={false}
            stroke='#ffffff2a'
          />
          <XAxis dataKey='time' />
          <YAxis ticks={[0, 15, 25, 30, 45, 60, 75, 90]} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line type='monotone' dataKey='hum' stroke='#4b44d8' dot={<></>} />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default LineCharts;
