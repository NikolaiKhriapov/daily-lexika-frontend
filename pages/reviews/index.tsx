import { useTranslation } from 'react-i18next';
import { Page } from '@utils/constants';
import AppLayout from '@components/app/AppLayout';
import ReviewsPageContent from '@components/app/content/review/ReviewsPageContent';

export default function ReviewsIndex() {
  const { t } = useTranslation();

  return (
    <AppLayout
      page={Page.REVIEWS}
      title={t('pages.reviews.title')}
      description={t('pages.reviews.description')}
    >
      <ReviewsPageContent />
    </AppLayout>
  );
}
