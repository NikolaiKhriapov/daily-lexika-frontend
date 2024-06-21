import { createContext, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { API } from '@admin/store/api/API';
import { useAppDispatch } from '@admin/store/hooks/hooks';
import { Page, WHITE_LIST } from '@admin/utils/Pages';
import { LocalStorage } from '@library/shared/utils';

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

  const setUserFromToken = (token: string) => {
    if (token) {
      try {
        localStorage.setItem(LocalStorage.ACCESS_TOKEN, token);
        if (window.location.pathname === Page.AUTH && isUserAuthenticated()) {
          router.push(Page.USERS);
        }
      } catch (error) {
        console.error('Error decoding JWT token');
      }
    }
  };

  const logout = () => {
    dispatch(API.util.resetApiState());
    router.push(Page.AUTH);
    localStorage.removeItem(LocalStorage.ACCESS_TOKEN);
  };

  useEffect(() => {
    const token = localStorage.getItem(LocalStorage.ACCESS_TOKEN);
    if (!isUserAuthenticated() && !WHITE_LIST.includes(window.location.pathname as Page)) {
      logout();
    }
    if (token) {
      setUserFromToken(token);
    }
    if (window.location.pathname === Page.AUTH && isUserAuthenticated()) {
      router.push(Page.USERS);
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
