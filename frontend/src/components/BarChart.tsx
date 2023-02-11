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
import { useEffect } from 'react';

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

const BarCharts = ({ className, data }: any) => {
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
