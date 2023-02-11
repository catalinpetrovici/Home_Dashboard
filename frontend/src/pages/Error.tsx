import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div className='y-screen h-screen w-screen bg-[#121220] pl-5 pr-5 text-white'>
      <h1>Error</h1>
      <Link to='/login'>Go to login page</Link>
    </div>
  );
};

export default Error;
