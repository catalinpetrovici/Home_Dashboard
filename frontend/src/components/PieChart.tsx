import { PieChart, Pie, Cell, Label, Rectangle } from 'recharts';

const PieCharts = ({ data, COLORS, value }: any, ...rest: any[]) => {
  let r = (Math.random() + 1).toString(36).substring(7);

  return (
    <PieChart width={190} height={110} {...rest}>
      <defs>
        {data.map((entry: any, index: number) => (
          <linearGradient
            key={`myGradient-${r}-${index}`}
            id={`myGradient-${r}-${index}`}
          >
            <stop offset='0%' stopColor={COLORS[index % COLORS.length].start} />
            <stop offset='100%' stopColor={COLORS[index % COLORS.length].end} />
          </linearGradient>
        ))}
      </defs>
      <Pie
        stroke='#ffffff60'
        dataKey='value'
        startAngle={180}
        endAngle={0}
        data={data}
        innerRadius={70}
        outerRadius={90}
        paddingAngle={5}
        cx='50%'
        cy='90%'
      >
        <Label value={value} width={30} position='center' />
        {
          data.map((entry: any, index: any) => (
            <Cell
              key={`cell-${index}`}
              fill={`url(#myGradient-${r}-${index})`}
            />
          )) as any
        }
      </Pie>
    </PieChart>
  );
};

export default PieCharts;
