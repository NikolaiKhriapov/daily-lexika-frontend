import React, { Dispatch, SetStateAction, useState } from 'react';
import { AuthFormType } from '@utils/constants';

type Props = {
  authFormType: AuthFormType;
  setAuthFormType: Dispatch<SetStateAction<AuthFormType>>,
};

const AuthPageContext = React.createContext<Props>({
  authFormType: AuthFormType.LOGIN,
  setAuthFormType: () => {},
});

function AuthPageProvider({ children }: { children: any }) {
  const [authFormType, setAuthFormType] = useState<AuthFormType>(AuthFormType.LOGIN);

  return (
    <AuthPageContext.Provider value={{ authFormType, setAuthFormType }}>
      {children}
    </AuthPageContext.Provider>
  );
}

export { AuthPageContext };
export default AuthPageProvider;
