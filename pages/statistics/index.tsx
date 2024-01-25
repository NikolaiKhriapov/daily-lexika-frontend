import PageLayout from '@components/shared/layout/PageLayout';
import StatisticsPageContent from '@components/statistics/StatisticsPageContent';

export default function StatisticsIndex() {
  return (
    <PageLayout title="Statistics" description="Statistics">
      <StatisticsPageContent />
    </PageLayout>
  );
}
