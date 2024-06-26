import { useTranslation } from 'react-i18next';
import AppLayout from '@daily-lexika/components/app/AppLayout';
import SearchPageContent from '@daily-lexika/components/app/content/search/SearchPageContent';
import { Page } from '@daily-lexika/utils/Pages';

export default function SearchIndex() {
  const { t } = useTranslation();

  return (
    <AppLayout
      page={Page.SEARCH}
      title={t('pages.search.title')}
      description={t('pages.search.description')}
    >
      <SearchPageContent />
    </AppLayout>
  );
}
