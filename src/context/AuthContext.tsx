import { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { login as performLogin } from '@services/authorization';
import { errorNotification } from '@services/popup-notification';
import { LocalStorage, Page } from '@utils/constants';
import { AuthenticationRequest, CustomJwtPayload, UserDTO } from '@utils/types';

type Props = {
  user: UserDTO | null;
  login: (authenticationRequest: AuthenticationRequest) => Promise<void>;
  logout: () => void;
  isUserAuthenticated: () => boolean;
  setUserFromToken: () => void;
  setUser: (user: UserDTO) => void;
};

const AuthContext = createContext<Props>({
  user: null,
  login: async () => {
  },
  logout: () => {
  },
  isUserAuthenticated: () => false,
  setUserFromToken: () => {
  },
  setUser: () => {
  },
});

function AuthProvider({ children }: { children: any }) {
  const router = useRouter();
  const [user, setUser] = useState<UserDTO | null>(null);

  const setUserFromToken = () => {
    const token = localStorage.getItem(LocalStorage.ACCESS_TOKEN);
    if (token) {
      try {
        const jwtToken: CustomJwtPayload = jwtDecode(token);
        setUser({ ...user, email: jwtToken.sub!, name: jwtToken.name, role: jwtToken.role });
      } catch (error) {
        console.error('Error decoding JWT token');
      }
    }
    if (!token && window.location.pathname !== Page.AUTH) {
      router.push(Page.AUTH);
    }
  };

  useEffect(() => {
    setUserFromToken();
  }, []);

  const login = async (authenticationRequest: AuthenticationRequest): Promise<void> =>
    new Promise((resolve, reject) => {
      performLogin(authenticationRequest)
        .then((response) => {
          const jwtTokenString = response.data.token;
          localStorage.setItem(LocalStorage.ACCESS_TOKEN, jwtTokenString);
          const jwtToken: CustomJwtPayload = jwtDecode(jwtTokenString);
          setUser({ ...user, email: jwtToken.sub, name: jwtToken.name, role: jwtToken.role });
          resolve();
        })
        .catch((error) => {
          errorNotification(error.code, error.response.data.message);
          reject(error);
        });
    });

  const logout = () => {
    localStorage.removeItem(LocalStorage.ACCESS_TOKEN);
    setUser(null);
    router.push(Page.AUTH);
  };

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
    <AuthContext.Provider value={{ user, login, logout, isUserAuthenticated, setUserFromToken, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
export default AuthProvider;
