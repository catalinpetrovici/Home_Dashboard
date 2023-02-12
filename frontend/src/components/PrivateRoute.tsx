import { useLocation, Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

type User = {
  authenticated: string;
  role: string;
};

const PrivateRoute = ({ children, ...rest }: any) => {
  const base64String = Cookies.get('authenticated');
  let user;
  if (base64String) {
    user = JSON.parse(window.atob(base64String)) as User;
  }
  const location = useLocation();

  return user?.authenticated ? (
    <Outlet />
  ) : user?.role === 'UNVERIFIED' ? (
    <Navigate to='/login' state={{ from: location }} replace />
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  );
};

export default PrivateRoute;
