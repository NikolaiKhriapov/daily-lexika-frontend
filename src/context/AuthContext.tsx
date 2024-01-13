import { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { login as performLogin } from '@services/authorization';
import { LocalStorage, Page } from '@utils/constants';
import { AuthenticatedUser, AuthenticationRequest, CustomJwtPayload } from '@utils/types';

type Props = {
  user: AuthenticatedUser | null;
  login: (authenticationRequest: AuthenticationRequest) => Promise<void>;
  logout: () => void;
  isUserAuthenticated: () => boolean;
  setUserFromToken: () => void;
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
});

function AuthProvider({ children }: { children: any }) {
  const router = useRouter();
  const [user, setUser] = useState<AuthenticatedUser | null>(null);

  const setUserFromToken = () => {
    const token = localStorage.getItem(LocalStorage.ACCESS_TOKEN);
    if (token) {
      const jwtToken: CustomJwtPayload = jwtDecode(token);
      setUser({ username: jwtToken.sub!, name: jwtToken.name, role: jwtToken.role });
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
          let jwtToken = response?.data.data.authenticationResponse.token;
          localStorage.setItem(LocalStorage.ACCESS_TOKEN, jwtToken);
          jwtToken = jwtDecode(jwtToken);
          setUser({ username: jwtToken.sub, name: jwtToken.name, role: jwtToken.role });
          resolve();
        })
        .catch((error) => reject(error));
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
    <AuthContext.Provider value={{ user, login, logout, isUserAuthenticated, setUserFromToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
export default AuthProvider;
