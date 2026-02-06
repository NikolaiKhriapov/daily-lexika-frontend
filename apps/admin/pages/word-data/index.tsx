import { useTranslation } from 'react-i18next';
import AppLayout from '@admin/components/AppLayout';
import WordDataPageContent from '@admin/components/content/dailylexika/word-data/WordDataPageContent';
import { Page } from '@admin/utils/Pages';

export default function WordDataIndex() {
  const { t } = useTranslation();

  return (
    <AppLayout
      page={Page.WORD_DATA}
      title={t('pages.wordData.title')}
      description={t('pages.wordData.description')}
    >
      <WordDataPageContent />
    </AppLayout>
  );
}
