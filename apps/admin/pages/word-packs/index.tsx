import { useTranslation } from 'react-i18next';
import AppLayout from '@admin/components/AppLayout';
import WordPacksPageContent from '@admin/components/content/dailylexika/word-packs/WordPacksPageContent';
import { Page } from '@admin/utils/Pages';

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
