import { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { useRouter } from 'next/router';
import { login as performLogin } from '../../src/services/authorization';
import { AuthenticatedUser, AuthenticationRequest } from '../../src/utils/types';
import { LocalStorage, Page, RoleName } from '../../src/utils/constants';

type Props = {
  user: AuthenticatedUser | null;
  login: (authenticationRequest: AuthenticationRequest) => Promise<void>;
  logout: () => void;
  isUserAuthenticated: () => boolean;
  setUserFromToken: () => void;
};

interface CustomJwtPayload extends JwtPayload {
  role: RoleName;
}

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
      setUser({ username: jwtToken.sub!, role: jwtToken.role });
    }
    if (!token && window.location.pathname !== Page.REGISTER) {
      router.push(Page.LOGIN);
    }
  };

  useEffect(() => {
    setUserFromToken();
  }, []);

  const login = async (authenticationRequest: AuthenticationRequest): Promise<void> =>
    new Promise((resolve, reject) => {
      performLogin(authenticationRequest)
        .then((response) => {
          let jwtToken = response.data.data.authenticationResponse.token;
          localStorage.setItem(LocalStorage.ACCESS_TOKEN, jwtToken);

          jwtToken = jwtDecode(jwtToken);

          setUser({ username: jwtToken.sub, role: jwtToken.role });
          resolve();
        })
        .catch((error) => reject(error));
    });

  const logout = () => {
    localStorage.removeItem(LocalStorage.ACCESS_TOKEN);
    setUser(null);
    router.push(Page.LOGIN);
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

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
