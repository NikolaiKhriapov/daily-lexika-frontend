import { useTranslation } from 'react-i18next';
import { Page } from '@utils/constants';
import AppLayout from '@components/app/AppLayout';
import WordPacksPageContent from '@components/app/content/word-pack/WordPacksPageContent';

export default function WordPacksIndex() {
  const { t } = useTranslation();

  return (
    <AppLayout
      page={Page.WORD_PACKS}
      title={t('pages.wordPacks.title')}
      description={t('pages.wordPacks.description')}
    >
      <WordPacksPageContent />
    </AppLayout>
  );
}
