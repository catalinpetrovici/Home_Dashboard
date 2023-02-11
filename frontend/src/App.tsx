import { Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import TempHum from './pages/TempHum';
import Dashboard from './pages/Dashboard';
import Unauthorized from './pages/Unauthorized';
import Error from './pages/Error';
import Root from './components/Root';
import NavBar from './components/NavBar';
import PrivateRoute from './components/PrivateRoute';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavBar />
      <Routes>
        <Route path='/' element={<Root />}>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />

          <Route element={<PrivateRoute />}>
            <Route index element={<Home />} />
            <Route path='dash' element={<TempHum />} />
            <Route path='dashboard' element={<Dashboard />} />
          </Route>

          <Route path='unauthorized' element={<Unauthorized />} />
          <Route path='*' element={<Error />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
