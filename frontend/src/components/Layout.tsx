import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <main className='y-screen w-screen bg-[#121220] pl-5 pr-5'>
      <Outlet />
    </main>
  );
};

export default Layout;
