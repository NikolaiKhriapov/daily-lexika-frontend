import ReviewsContent from '@components/review/ReviewsContent';
import PageLayout from '../../src/shared/PageLayout';

export default function ReviewsIndex() {
  return (
    <PageLayout title='Reviews' description='Reviews'>
      <ReviewsContent />
    </PageLayout>
  );
}
