import { useTranslation } from 'react-i18next';
import AppLayout from '@daily-lexika/components/app/AppLayout';
import WordPacksPageContent from '@daily-lexika/components/app/content/word-pack/WordPacksPageContent';
import { Page } from '@daily-lexika/utils/Pages';

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
