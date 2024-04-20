import { Page } from '@utils/constants';
import AppLayout from '@components/app/AppLayout';
import StatisticsPageContent from '@components/app/content/statistics/StatisticsPageContent';

export default function StatisticsIndex() {
  return (
    <AppLayout page={Page.STATISTICS} title="Statistics" description="Statistics">
      <StatisticsPageContent />
    </AppLayout>
  );
}
