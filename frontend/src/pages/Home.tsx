import PieCharts from '../components/PieChart';
import { CiTempHigh } from 'react-icons/ci';
import { WiHumidity } from 'react-icons/wi';
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

const Home = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  return (
    <div ref={ref} className=''>
      <h1 className='text-white title'>Welcome home</h1>
      <div className='flex flex-wrap'>
        <section className='group-1 m-1 max-300'>
          <div className='test'>
            <span className='mb-2 block text-[#ffffff72]'>
              How's the air quality?
            </span>
            <span>The air quality is good and fresh you can go out today</span>
          </div>
        </section>
        <section className='group-3 m-1 max-300'>
          <div className='test'>
            <span className='mb-2 block text-[#ffffff72]'>Outside</span>
            <div className='inline-block'>
              <span className='mr-3'>
                <CiTempHigh
                  size={30}
                  className='inline-block text-[#fe696972]'
                />
                24
              </span>
            </div>
            <div className='inline-block'>
              <span>
                <WiHumidity
                  size={35}
                  className='inline-block text-[#7b8dfe72]'
                />
                60%
              </span>
            </div>
          </div>
        </section>
        <section className='group-4 m-1 max-300'>
          <div className='test'>
            <span className='mb-2 block text-[#ffffff72]'>Inside</span>
            <div className='inline-block'>
              <span className='mr-3'>
                <CiTempHigh
                  size={30}
                  className='inline-block text-[#fe696972]'
                />
                24
              </span>
            </div>
            <div className='inline-block'>
              <span>
                <WiHumidity
                  size={35}
                  className='inline-block text-[#7b8dfe72]'
                />
                60%
              </span>
            </div>
          </div>
        </section>

        <section className='group-2 m-1'>
          <div className='test'>
            <span className='mb-2 block text-[#ffffff72]'>Temperature</span>
            <PieCharts data={data} COLORS={COLORS} value='24°C' />
          </div>
          <div className='mt-2 test'>
            <span className='mb-2 block text-[#ffffff72]'>Humidity</span>
            <PieCharts data={data2} COLORS={COLORS2} value='60%' />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
