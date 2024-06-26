import { useTranslation } from 'react-i18next';

import { Heading } from '../basic/Heading';
import { IndexPageContainer } from './IndexPageContainer';

export function ErrorComponent() {
  const { t } = useTranslation();

  return (
    <IndexPageContainer>
      <Heading isCentered>{t('ErrorComponent')}</Heading>
    </IndexPageContainer>
  );
}
