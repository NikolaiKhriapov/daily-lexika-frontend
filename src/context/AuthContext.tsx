import { createContext, ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { API } from '@store/api/API';
import { useGetUserInfoQuery } from '@store/api/userAPI';
import { useAppDispatch } from '@store/hooks/hooks';
import { LocalStorage, Page } from '@utils/constants';

type ContextProps = {
  setUserFromToken: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<ContextProps>({
  setUserFromToken: () => {
  },
  logout: () => {
  },
});

type Props = {
  children: ReactNode;
};

function AuthProvider(props: Props) {
  const { children } = props;

  const router = useRouter();
  const dispatch = useAppDispatch();

  const [skip, setSkip] = useState(true);

  const { data: user } = useGetUserInfoQuery(undefined, { skip });

  const setUserFromToken = (token: string) => {
    if (token) {
      try {
        localStorage.setItem(LocalStorage.ACCESS_TOKEN, token);
        if (window.location.pathname === Page.AUTH) {
          router.push(Page.REVIEWS);
        }
      } catch (error) {
        console.error('Error decoding JWT token');
      }
    } else if (window.location.pathname !== Page.LANDING) {
      router.push(Page.AUTH);
    }
  };

  const logout = () => {
    localStorage.removeItem(LocalStorage.ACCESS_TOKEN);
    dispatch(API.util.resetApiState());
    router.push(Page.AUTH);
  };

  useEffect(() => {
    const token = localStorage.getItem(LocalStorage.ACCESS_TOKEN);
    if (!isUserAuthenticated() || !token) {
      logout();
    }
    if (token) {
      setUserFromToken(token);
      setSkip(false);
    }
    if (user) {
      router.push(Page.REVIEWS);
    }
  }, []);

  const isUserAuthenticated = () => {
    const token = localStorage.getItem(LocalStorage.ACCESS_TOKEN);
    if (!token) {
      return false;
    }
    const expiration = (jwtDecode(token) as JwtPayload).exp;
    if (Date.now() > expiration! * 1000) {
      logout();
      return false;
    }
    return true;
  };

  return (
    <AuthContext.Provider value={{ setUserFromToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
export default AuthProvider;
