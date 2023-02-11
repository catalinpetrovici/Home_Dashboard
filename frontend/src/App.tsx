import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Login from './pages/Login';
import Register from './pages/Register';
import Unauthorized from './pages/Unauthorized';
import Error from './pages/Error';
import Root from './components/Root';
import PrivateRoute from './components/PrivateRoute';
import Dashboard, { loader as dashLoader } from './pages/Dashboard';
import Home, { loader as homeLoader } from './pages/Home';
import TempHum, { loader as tempHumLoader } from './pages/TempHum';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 10,
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <PrivateRoute />,
        errorElement: <PrivateRoute />,
        children: [
          {
            index: true,
            element: <Home />,
            loader: homeLoader(queryClient),
            // action: homeAction(queryClient),
          },
          {
            path: 'dashboard',
            element: <Dashboard />,
            loader: dashLoader(queryClient),
            // action: dashboardAction(queryClient),
          },
          {
            path: 'dash',
            element: <TempHum />,
            loader: tempHumLoader(queryClient),
            // action: dashAction(queryClient),
          },
        ],
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'unauthorized',
        element: <Unauthorized />,
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {/* <ReactQueryDevtools position='bottom-right' /> */}
    </QueryClientProvider>
  );
}

export default App;
