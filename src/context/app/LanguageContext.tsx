import { useEffect } from 'react';
import { useGetUserQuery } from '@store/api/userAPI';
import { Language } from '@utils/types';

import i18n from '../../../i18n';

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
          case Language.CHINESE:
            return 'zh';
          default:
            return 'en';
        }
      })();
      i18n.changeLanguage(interfaceLanguage);
    }
  }, [user]);

  return <>{children}</>;
}
