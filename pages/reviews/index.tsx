import ReviewsPageContent from '@components/review/ReviewsPageContent';
import PageLayout from '@components/shared/layout/PageLayout';

export default function ReviewsIndex() {
  return (
    <PageLayout title='Reviews' description='Reviews'>
      <ReviewsPageContent />
    </PageLayout>
  );
}
