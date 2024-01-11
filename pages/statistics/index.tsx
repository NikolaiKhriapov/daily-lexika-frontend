import StatisticsContent from '@components/statistics/StatisticsContent';
import PageLayout from '../../src/shared/PageLayout';

export default function StatisticsIndex() {
  return (
    <PageLayout title="Statistics" description="Statistics">
      <StatisticsContent />
    </PageLayout>
  );
}
