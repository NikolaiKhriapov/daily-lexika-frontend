import { useTranslation } from 'react-i18next';
import AppLayout from '@daily-budget/components/app/AppLayout';
import HomePageContent from '@daily-budget/components/app/content/home/HomePageContent';
import { Page } from '@daily-budget/utils/Pages';

export default function HomeIndex() {
  const { t } = useTranslation();

  return (
    <AppLayout
      page={Page.HOME}
      title={t('pages.home.title')}
      description={t('pages.home.description')}
    >
      <HomePageContent />
    </AppLayout>
  );
}
