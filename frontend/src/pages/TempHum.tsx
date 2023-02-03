import BarCharts from '../components/BarChart';
import LineCharts from '../components/LineCharts';
import { useRef, useLayoutEffect, useState } from 'react';

const BookList = () => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref} className=''>
      <h1 className='title text-white'>Temp & Hum</h1>
      <div className='flex flex-wrap'>
        <section>
          <div className='test inline-block'>
            <span className='mb-2 block'>Power Consumption</span>
            <BarCharts />
          </div>
        </section>
        <section>
          <div className='test mt-2 max-w-min lg:ml-10 lg:mt-0'>
            <span className='mb-2 block'>Temp & Hum</span>
            <LineCharts />
          </div>
        </section>
      </div>
    </div>
  );
};

export default BookList;
