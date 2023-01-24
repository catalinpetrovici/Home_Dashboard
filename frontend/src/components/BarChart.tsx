import {
  CartesianGrid,
  Legend,
  BarChart,
  Bar,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const data = [
  {
    name: '0',
    W: 300,
  },
  {
    name: '1',
    W: 250,
  },
  {
    name: '2',
    W: 10,
  },
  {
    name: '3',
    W: 10,
  },
  {
    name: '4',
    W: 10,
  },
  {
    name: '5',
    W: 10,
  },
  {
    name: '6',
    W: 10,
  },
  {
    name: '7',
    W: 10,
  },
  {
    name: '8',
    W: 10,
  },
  {
    name: '9',
    W: 10,
  },
  {
    name: '10',
    W: 10,
  },
  {
    name: '11',
    W: 10,
  },
  {
    name: '12',
    W: 40,
  },
  {
    name: '13',
    W: 40,
  },
  {
    name: '14',
    W: 40,
  },
  {
    name: '15',
    W: 40,
  },
  {
    name: '16',
    W: 40,
  },
  {
    name: '17',
    W: 40,
  },
  {
    name: '18',
    W: 40,
  },
  {
    name: '19',
    W: 200,
  },
  {
    name: '20',
    W: 250,
  },
  {
    name: '21',
    W: 320,
  },
  {
    name: '22',
    W: 370,
  },
  {
    name: '23',
    W: 400,
  },
];

const BarCharts = ({ width, className }: any) => {
  const widthContainer =
    width > 900 ? width * 0.45 : width < 500 ? width : width * 0.8;
  const barSizeContainer =
    width > 900 ? width * 0.005 : width < 500 ? width * 0.02 : width * 0.008;

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
      <Tooltip cursor={false} />
      <Legend />
      <Bar dataKey='W' fill='#82ca9d' />
    </BarChart>
  );
};

export default BarCharts;
