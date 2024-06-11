import { useTranslation } from 'react-i18next';
import { Page } from '@utils/constants';
import AppLayout from '@components/app/AppLayout';
import SearchPageContent from '@components/app/content/search/SearchPageContent';

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
