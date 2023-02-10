import PieCharts from '../components/PieChart';
import { CiTempHigh } from 'react-icons/ci';
import { WiHumidity } from 'react-icons/wi';
import { useRef, useLayoutEffect, useState } from 'react';
import axiosIns from '../utils/axios';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Navigate } from 'react-router-dom';

const fetchData = async () => {
  const res = await axiosIns.get('/api/v1/nowtemp');
  return res.data;
};

const data123 = [
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

interface IApiError {
  message: string;
  description: string;
  statusCode: string | number;
}

const Home = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { status, data, isLoading, isError, error } = useQuery({
    queryKey: ['temp', 'now'],
    queryFn: fetchData,
    onError: (err: IApiError) => err,
  });

  console.log(error);

  if (isLoading) {
    return <h1 className='title text-white'>Loading...</h1>;
  }

  if (isError) {
    return <Navigate to={'/login'} replace />;
  }

  return (
    <div ref={ref} className=''>
      <h1 className='title text-white'>Welcome home</h1>
      <div className='flex flex-wrap'>
        <section className='group-1 max-300 m-1'>
          <div className='test'>
            <span className='mb-2 block text-[#ffffff72]'>
              How's the air quality?
            </span>
            <span>The air quality is good and fresh you can go out today</span>
          </div>
        </section>
        <section className='group-3 max-300 m-1'>
          <div className='test'>
            <span className='mb-2 block text-[#ffffff72]'>Inside</span>
            <div className='inline-block'>
              <span className='mr-3'>
                <CiTempHigh
                  size={30}
                  className='inline-block text-[#fe696972]'
                />
                {data.tempInside}
              </span>
            </div>
            <div className='inline-block'>
              <span>
                <WiHumidity
                  size={35}
                  className='inline-block text-[#556cff72]'
                />
                {data.humInside}
              </span>
            </div>
          </div>
          <div className='test'>
            <span className='mb-2 block  text-[#ffffff72]'>Outside</span>
            <div className='inline-block'>
              <span className='mr-3'>
                <CiTempHigh
                  size={30}
                  className={`inline-block ${
                    data.tempOutside > 0
                      ? 'text-[#fe696972]'
                      : 'text-[#557aff72]'
                  } `}
                />
                {data.tempOutside}
              </span>
            </div>
            <div className='inline-block'>
              <span>
                <WiHumidity
                  size={35}
                  className='inline-block text-[#556cff72]'
                />
                {data.humOutside}
              </span>
            </div>
          </div>
        </section>
        <section className='group-4 max-300 m-1'></section>
        {/* <section className='group-2 m-1'>
          <div className='test'>
            <span className='mb-2 block text-[#ffffff72]'>Temperature</span>
            <PieCharts key={1} data={data123} COLORS={COLORS} value='24°C' />
          </div>
          <div className='test mt-2'>
            <span className='mb-2 block text-[#ffffff72]'>Humidity</span>
            <PieCharts key={2} data={data2} COLORS={COLORS2} value='60%' />
          </div>
        </section> */}
      </div>
    </div>
  );
};

export default Home;
