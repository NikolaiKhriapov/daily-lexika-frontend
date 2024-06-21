import { useTranslation } from 'react-i18next';
import AppLayout from '@daily-lexika/components/app/AppLayout';
import ReviewsPageContent from '@daily-lexika/components/app/content/review/ReviewsPageContent';
import { Page } from '@daily-lexika/utils/Pages';

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
