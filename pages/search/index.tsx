import { Page } from '@utils/constants';
import AppLayout from '@components/app/AppLayout';
import SearchPageContent from '@components/app/content/search/SearchPageContent';

export default function SearchIndex() {
  return (
    <AppLayout page={Page.SEARCH} title='Search' description='Search'>
      <SearchPageContent />
    </AppLayout>
  );
}
