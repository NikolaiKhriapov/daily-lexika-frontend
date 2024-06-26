import { useTranslation } from 'react-i18next';
import AppLayout from '@admin/components/AppLayout';
import UsersPageContent from '@admin/components/content/users/UsersPageContent';
import { Page } from '@admin/utils/Pages';

export default function ReviewsIndex() {
  const { t } = useTranslation();

  return (
    <AppLayout
      page={Page.USERS}
      title={t('pages.users.title')}
      description={t('pages.users.description')}
    >
      <UsersPageContent />
    </AppLayout>
  );
}
