import { useTranslation } from 'react-i18next';
import AppLayout from '@daily-lexika/components/app/AppLayout';
import StatisticsPageContent from '@daily-lexika/components/app/content/statistics/StatisticsPageContent';
import { Page } from '@daily-lexika/utils/Pages';

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
