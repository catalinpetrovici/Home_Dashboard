import BarCharts from '../components/BarChart';
import LineCharts from '../components/LineCharts';
import { useRef, useLayoutEffect, useState } from 'react';

const BookList = () => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref} className=''>
      <h1 className='title text-white'>Temp & Hum</h1>
      <div className='flex flex-col lg:flex-row'>
        <section className='flex-1'>
          <div className='test lg:mr-5'>
            <span className='mb-2 block'>Power Consumption</span>
            <BarCharts />
          </div>
        </section>
        <section className='flex-1'>
          <div className='test'>
            <span className='mb-2 block'>Temp & Hum</span>
            <LineCharts />
          </div>
        </section>
      </div>
    </div>
  );
};

export default BookList;
