import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import RangeSlider from '../components/RangeSlider';
import { useQuery, useMutation } from '@tanstack/react-query';

type LedSubmit = { value: number; id: string };

const fetchUsers = async () => {
  const res = await fetch('/api/v1');
  return res.json();
};

export const addLed = async ({ value, id }: LedSubmit) => {
  const object = {
    [id]: value.toString(),
  };

  return await fetch(`http://192.168.0.111/api/v1/led`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(object),
  });
};

const Dashboard = () => {
  const ref = useRef(null);
  const { status, data, isLoading, isError } = useQuery(['users'], fetchUsers);
  const [valueRange, setValueRange] = useState({ '1': 0, '2': 0 });
  const changeLedValueMutation = useMutation(addLed);

  console.log(data);

  useEffect(() => {
    if (status === 'success') {
      setValueRange({ ...data });
    }
  }, [status, data]);

  const handleSubmit = (led: LedSubmit) => {
    changeLedValueMutation.mutate(led);
  };

  const handleRangeSubmit = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    e.preventDefault();
    const value = parseFloat(e.target.value);
    handleSubmit({ value, id });
    setValueRange({ ...valueRange, [id]: [value] });
  };

  return (
    <div ref={ref} className=''>
      <h1 className='text-white title'>Controls</h1>
      <div className='flex flex-wrap'>
        <section className='group-2 w-full max-200 m-1'>
          {Object.keys(valueRange).map((id: string) => (
            <section className='test mt-2'>
              <span className='mb-2 block text-[#ffffff72]'>Led {id}</span>
              <RangeSlider
                className='w-full'
                stepRange={1}
                minRange={0}
                maxRange={255}
                valueRange={valueRange[id as keyof typeof valueRange]}
                handleRangeChange={(event) => handleRangeSubmit(event, id)}
              />
            </section>
          ))}
        </section>
        <section className='group-3 w-full max-200 m-1'>
          <section className='test'>
            <span className='mb-2 block text-[#ffffff72]'>Led Bedroom</span>
            <label className='switch'>
              <input type='checkbox' />
              <span className='slider round'></span>
            </label>
          </section>
          <section className='test'>
            <span className='mb-2 block text-[#ffffff72]'>Led PC</span>
            <label className='switch'>
              <input type='checkbox' />
              <span className='slider round'></span>
            </label>
          </section>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
