import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import RangeInput from '../components/RangeInput';
import CheckBoxInput from '../components/CheckBoxInput';
import { useQuery, useMutation, QueryClient } from '@tanstack/react-query';
import axiosIns from '../utils/axios';
import { useLoaderData } from 'react-router-dom';

const fetchData = async () => {
  const res = await axiosIns.get('/api/v1');
  return res.data;
};

export const sentCommand = async (data: any) => {
  // TODO VALIDATE THE DATA

  await axiosIns.post(`/api/v1/led`, data);
};

type Data = {
  id: string;
  lastChange: string;
  name: string;
  tab: string;
  type: string;
  value: string;
  setupRange?: { step: number; min: number; max: number };
};

const Dashboard = () => {
  const data = useLoaderData() as Data[];

  const sendCommandMutation = useMutation(sentCommand);

  async function sendCommandComponent(
    value: string | number | boolean,
    id: string
  ) {
    sendCommandMutation.mutate({ value, id });
  }

  return (
    <div className=''>
      <h1 className='title text-white'>Controls</h1>
      <div className='flex flex-wrap'>
        <section className='group-1 max-200 m-1 w-full'>
          {data.map((curr: any) => {
            const { id, value, type, tab, name, setupRange } = curr;

            if (tab != 1 || (type !== 'switch' && type !== 'slider')) return;

            if (type === 'switch') {
              return (
                <CheckBoxInput
                  id={id}
                  key={id}
                  value={value}
                  name={name}
                  sendCommand={sendCommandComponent}
                />
              );
            }
            if (type === 'slider') {
              return (
                <RangeInput
                  id={id}
                  key={id}
                  setupRange={setupRange}
                  value={value}
                  name={name}
                  sendCommand={sendCommandComponent}
                />
              );
            }
          })}
        </section>
        <section className='group-2 max-200 m-1 w-full'>
          {data.map((curr: any) => {
            const { id, value, type, tab, name, setupRange } = curr;

            if (tab != 2 || (type !== 'switch' && type !== 'slider')) return;

            if (type === 'switch') {
              return (
                <CheckBoxInput
                  id={id}
                  key={id}
                  value={value}
                  name={name}
                  sendCommand={sendCommandComponent}
                />
              );
            }
            if (type === 'slider') {
              return (
                <RangeInput
                  id={id}
                  key={id}
                  setupRange={setupRange}
                  value={value}
                  name={name}
                  sendCommand={sendCommandComponent}
                />
              );
            }
          })}
        </section>
        <section className='group-3 max-200 m-1 w-full'>
          {data.map((curr: any) => {
            const { id, value, type, tab, name, setupRange } = curr;

            if (tab != 3 || (type !== 'switch' && type !== 'slider')) return;

            if (type === 'switch') {
              const val =
                value === 'Off' ? false : value === 'On' ? true : value;
              return (
                <CheckBoxInput
                  id={id}
                  key={id}
                  value={val}
                  name={name}
                  sendCommand={sendCommandComponent}
                />
              );
            }
            if (type === 'slider') {
              return (
                <RangeInput
                  id={id}
                  key={id}
                  setupRange={setupRange}
                  value={value}
                  name={name}
                  sendCommand={sendCommandComponent}
                />
              );
            }
          })}
        </section>
        <section className='group-4 max-200 m-1 w-full'>
          {data.map((curr: any) => {
            const { id, value, type, tab, name, setupRange } = curr;

            if (tab != 4 || (type !== 'switch' && type !== 'slider')) return;

            if (type === 'switch') {
              return (
                <CheckBoxInput
                  id={id}
                  key={id}
                  value={value}
                  name={name}
                  sendCommand={sendCommandComponent}
                />
              );
            }
            if (type === 'slider') {
              return (
                <RangeInput
                  id={id}
                  key={id}
                  setupRange={setupRange}
                  value={value}
                  name={name}
                  sendCommand={sendCommandComponent}
                />
              );
            }
          })}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;

export function loader(queryClient: QueryClient) {
  return async () => {
    const data = queryClient.fetchQuery({
      queryKey: ['dashboard', 'slider&switch'],
      queryFn: fetchData,
    });
    if (data) return data;

    return queryClient.fetchQuery({
      queryKey: ['dashboard', 'slider&switch'],
      queryFn: () => {},
    });
  };
}
