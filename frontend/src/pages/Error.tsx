import React from 'react';
import { Link } from 'react-router-dom';
import axiosIns from '../utils/axios';

const logOut = async () => {
  const res = await axiosIns.post('/api/v1/auth/logout');
};

const Error = () => {
  return (
    <div className='y-screen h-screen w-screen bg-[#121220] pl-5 pr-5 text-white'>
      <h1>Error</h1>
      <Link to='/login'>Go to login page</Link>
      <button onClick={logOut}>Log Out</button>
    </div>
  );
};

export default Error;
