import { createContext, Dispatch, useContext, useState } from 'react';

const AuthContext = createContext({
  auth: {},
  setAuth: ((authenticatedObject) => undefined) as Dispatch<any>,
});

type AuthContext = {
  authenticated: string;
  role: string;
};

export const AuthProvider = ({ children }: any) => {
  const [auth, setAuth] = useState<AuthContext>({
    authenticated: '',
    role: '',
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// make sure use
export const useAuthContext = () => {
  return useContext(AuthContext);
};

export default useAuthContext;
