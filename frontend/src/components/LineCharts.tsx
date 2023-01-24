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

import { hum, temp } from './data';

const LineCharts = ({ width, className }: any) => {
  const widthContainer =
    width > 900 ? width * 0.45 : width < 500 ? width : width * 0.8;
  const barSizeContainer =
    width > 900 ? width * 0.005 : width < 500 ? width * 0.02 : width * 0.008;

  return (
    <>
      <LineChart
        data={temp}
        height={300}
        width={widthContainer * 0.92}
        margin={{
          left: -30,
        }}
        syncId='date'
      >
        <CartesianGrid
          strokeDasharray='3'
          vertical={false}
          stroke='#ffffff2a'
        />
        <XAxis dataKey='date' />
        <YAxis ticks={[0, 10, 15, 20, 25, 30]} />
        <Tooltip />
        <Legend />
        <Line type='monotone' dataKey='temp' stroke='#d42d2d' dot={<></>} />
      </LineChart>
      <LineChart
        data={hum}
        height={300}
        width={widthContainer * 0.92}
        margin={{
          left: -30,
        }}
        syncId='date'
      >
        <CartesianGrid
          strokeDasharray='3'
          vertical={false}
          stroke='#ffffff2a'
        />
        <XAxis dataKey='date' />
        <YAxis ticks={[0, 15, 25, 30, 45, 60, 75, 90]} />
        <Tooltip />
        <Legend />
        <Line type='monotone' dataKey='hum' stroke='#4b44d8' dot={<></>} />
      </LineChart>
    </>
  );
};

export default LineCharts;
