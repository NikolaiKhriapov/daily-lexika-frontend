import { Page } from '@utils/constants';
import AppLayout from '@components/app/AppLayout';
import ReviewsPageContent from '@components/app/content/review/ReviewsPageContent';

export default function ReviewsIndex() {
  return (
    <AppLayout page={Page.REVIEWS} title='Reviews' description='Reviews'>
      <ReviewsPageContent />
    </AppLayout>
  );
}
