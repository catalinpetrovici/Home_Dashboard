import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

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

const LineCharts = ({ className, data }: any) => {
  return (
    <>
      <ResponsiveContainer width='100%' height={300}>
        <LineChart
          data={data}
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
          data={data}
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
