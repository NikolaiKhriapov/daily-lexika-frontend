import AppLayout from '@components/app/AppLayout';
import StatisticsPageContent from '@components/app/content/statistics/StatisticsPageContent';

export default function StatisticsIndex() {
  return (
    <AppLayout title="Statistics" description="Statistics">
      <StatisticsPageContent />
    </AppLayout>
  );
}
