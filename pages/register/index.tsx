import { useAuth } from '@components/context/AuthContext';
import { useRouter } from 'next/router';
import AuthPage from '../../components/auth/AuthPage';
import { AuthFormType, LocalStorage, Page } from '../../src/utils/constants';

export default function LoginIndex() {
  const { setUserFromToken } = useAuth();

  const router = useRouter();

  return (
    <AuthPage
      data={{
        heading: 'Register account',
        link: { href: Page.LOGIN, text: 'Already have an account? Log in now' },
        authForm: {
          formType: AuthFormType.REGISTER,
          onSuccess: (token: string) => {
            global.localStorage.setItem(LocalStorage.ACCESS_TOKEN, token);
            setUserFromToken();
            router.push(Page.REVIEWS);
          },
        },
      }}
    />
  );
}
