import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const SharedLayout = () => {
  return (
    <>
      <header className='h-[3.3rem]'></header>
      <main className='min-h-[calc(100vh-3.3rem)]'>
        <Outlet context={{}} />
      </main>
      <div aria-label='footer'></div>
    </>
  );
};

export default SharedLayout;
