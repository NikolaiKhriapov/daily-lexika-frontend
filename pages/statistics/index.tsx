import { useTranslation } from 'react-i18next';
import { Page } from '@utils/constants';
import AppLayout from '@components/app/AppLayout';
import StatisticsPageContent from '@components/app/content/statistics/StatisticsPageContent';

export default function StatisticsIndex() {
  const { t } = useTranslation();

  return (
    <AppLayout
      page={Page.STATISTICS}
      title={t('pages.statistics.title')}
      description={t('pages.statistics.description')}
    >
      <StatisticsPageContent />
    </AppLayout>
  );
}
