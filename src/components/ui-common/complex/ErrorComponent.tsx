import { useTranslation } from 'react-i18next';
import Heading from '@components/ui-common/basic/Heading';
import IndexPageContainer from '@components/ui-common/complex/IndexPageContainer';

export default function ErrorComponent() {
  const { t } = useTranslation();

  return (
    <IndexPageContainer>
      <Heading isCentered>{t('ErrorComponent')}</Heading>
    </IndexPageContainer>
  );
}
