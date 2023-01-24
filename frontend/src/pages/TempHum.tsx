import BarCharts from '../components/BarChart';
import LineCharts from '../components/LineCharts';
import { useRef, useLayoutEffect, useState } from 'react';

const data = [
  { name: 'Group A', value: 10 },
  { name: 'Group A', value: 5 },
  { name: 'Group B', value: 10 },
];

const COLORS = [
  { start: '#1BA43A60', end: '#A5C71160' },
  { start: '#9ece00', end: '#9ece00' },
  { start: '#F3912460', end: '#FDC73960' },
];

const data2 = [
  { name: 'Group A', value: 40 },
  { name: 'Group B', value: 20 },
  { name: 'Group B', value: 20 },
];

const COLORS2 = [
  { start: '#d94d5960', end: '#9B8DA660' },
  { start: '#59BADB', end: '#59BADB' },
  { start: '#5998E760', end: '#4E69DC60' },
];

const BookList = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    if (ref.current && ref.current.clientHeight) {
      if (width > 400) setWidth(700);
      else setWidth(ref.current.clientWidth);
      setHeight(ref.current.clientHeight);
    }
  }, []);

  return (
    <div ref={ref} className=''>
      <h1 className='text-white title'>Temp & Hum</h1>
      <div className='flex flex-wrap'>
        <section>
          <div className='inline-block test'>
            <span className='mb-2 block'>Power Consumption</span>
            <BarCharts width={width} />
          </div>
        </section>
        <section>
          <div className='max-w-min mt-2 lg:ml-10 lg:mt-0 test'>
            <span className='mb-2 block'>Temp & Hum</span>
            <LineCharts width={width} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default BookList;
