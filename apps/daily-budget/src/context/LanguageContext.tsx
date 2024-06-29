import { useEffect } from 'react';
import { useGetUserQuery } from '@daily-budget/store/api/userAPI';
import { Language } from '@library/daily-budget';

import i18n from '../../i18n';

export default function LanguageProvider({ children }: any) {
  const { data: user } = useGetUserQuery();

  useEffect(() => {
    if (user) {
      const interfaceLanguage = (() => {
        switch (user.interfaceLanguage) {
          case Language.ENGLISH:
            return 'en';
          case Language.RUSSIAN:
            return 'ru';
          default:
            return 'en';
        }
      })();
      i18n.changeLanguage(interfaceLanguage);
    }
  }, [user]);

  return <>{children}</>;
}
