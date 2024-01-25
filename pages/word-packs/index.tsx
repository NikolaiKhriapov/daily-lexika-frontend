import PageLayout from '@components/shared/layout/PageLayout';
import WordPacksPageContent from '@components/word-pack/WordPacksPageContent';

export default function WordPacksIndex() {
  return (
    <PageLayout title='Word Packs' description='Word Packs'>
      <WordPacksPageContent />
    </PageLayout>
  );
}
