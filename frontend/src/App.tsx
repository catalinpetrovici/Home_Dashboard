import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// prettier-ignore
import { Home, TempHum, Dashboard, Login, Error, Register, Unauthorized } from './pages/index';
import Layout from './components/Layout';
import NavBar from './components/NavBar';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavBar />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='unauthorized' element={<Unauthorized />} />

          <Route path='/' element={<Home />} />
          <Route path='dash' element={<TempHum />} />
          <Route path='dashboard' element={<Dashboard />} />

          <Route path='*' element={<Error />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
