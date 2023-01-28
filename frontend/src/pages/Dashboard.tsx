import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import useDebounce from '../customHooks/useDebounce';
import RangeSlider from '../components/RangeSlider';
import { useQuery, useMutation } from '@tanstack/react-query';
import axiosIns from '../utils/axios';
import axios from 'axios';

const fetchData = async () => {
  const res = await axiosIns.get('/api/v1');
  console.log('axios', res);
  return res.data;
};

export const addLed = async (data: any) => {
  console.log(data);
  await axiosIns.post(`/api/v1/led`, data);
};

const Dashboard = () => {
  const [sliderData, setSliderData] = useState({});
  const [switchData, setSwitchData] = useState({});
  useDebounce(() => handleSubmit(), 500, [sliderData]);

  const { status, data, isLoading, isError } = useQuery(['data'], fetchData);

  useEffect(() => {
    if (!isLoading) {
      setSliderData(data.slider);
      setSwitchData(data.switch);
      console.log('SET SLIDER & SWITCH DATA');
    }
  }, [data]);

  const changeLedValueMutation = useMutation(addLed);

  const handleSubmit = () => {
    changeLedValueMutation.mutate(sliderData);
  };

  const handleSwitchSubmit = (id: any, value: any) => {
    setSwitchData((oldData) => {
      changeLedValueMutation.mutate({ ...oldData, [id]: !value });
      return { ...oldData, [id]: !value };
    });
  };

  const handleRangeSubmit = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    e.preventDefault();
    const value = parseFloat(e.target.value);
    setSliderData((oldData) => {
      return { ...oldData, [id]: value };
    });
  };

  if (isLoading) {
    return <h1 className='text-white title'>Loading...</h1>;
  }
  if (isError) {
    return (
      <h1 className='text-white title'>Error! Please contact the host.</h1>
    );
  }

  return (
    <div className=''>
      <h1 className='text-white title'>Controls</h1>
      <div className='flex flex-wrap'>
        <section className='group-2 w-full max-200 m-1'>
          {Object.entries(sliderData).map((curr: any) => {
            const [id, value] = curr;
            return (
              <section className='test mt-2' key={id}>
                <span className='mb-2 block text-[#ffffff72]'>{id}</span>
                <RangeSlider
                  className='w-full'
                  stepRange={1}
                  minRange={0}
                  maxRange={255}
                  valueRange={+value}
                  handleRangeChange={(e) => {
                    handleRangeSubmit(e, id);
                  }}
                />
              </section>
            );
          })}
        </section>
        <section className='group-3 w-full max-200 m-1'>
          {Object.entries(switchData).map((curr: any) => {
            const [id, value] = curr;
            return (
              <section key={id} className='test'>
                <span className='mb-2 block text-[#ffffff72]'>Led Bedroom</span>
                <label className='switch'>
                  <input
                    type='checkbox'
                    checked={value}
                    onChange={() => handleSwitchSubmit(id, value)}
                  />
                  <span className='slider round'></span>
                </label>
              </section>
            );
          })}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
