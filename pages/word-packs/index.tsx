import { Page } from '@utils/constants';
import AppLayout from '@components/app/AppLayout';
import WordPacksPageContent from '@components/app/content/word-pack/WordPacksPageContent';

export default function WordPacksIndex() {
  return (
    <AppLayout page={Page.WORD_PACKS} title='Word Packs' description='Word Packs'>
      <WordPacksPageContent />
    </AppLayout>
  );
}
