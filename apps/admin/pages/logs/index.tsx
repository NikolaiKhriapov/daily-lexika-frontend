import { useTranslation } from 'react-i18next';
import AppLayout from '@admin/components/AppLayout';
import LogsPageContent from '@admin/components/content/dailylexika/logs/LogsPageContent';
import { Page } from '@admin/utils/Pages';

export default function LogsIndex() {
  const { t } = useTranslation();

  return (
    <AppLayout
      page={Page.LOGS}
      title={t('pages.logs.title')}
      description={t('pages.logs.description')}
    >
      <LogsPageContent />
    </AppLayout>
  );
}
