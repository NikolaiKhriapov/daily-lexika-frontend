import AppLayout from '@components/app/AppLayout';
import ReviewsPageContent from '@components/app/content/review/ReviewsPageContent';

export default function ReviewsIndex() {
  return (
    <AppLayout title='Reviews' description='Reviews'>
      <ReviewsPageContent />
    </AppLayout>
  );
}
