import WordPacksContent from '@components/word-pack/WordPacksContent';
import PageLayout from '../../src/shared/PageLayout';

export default function WordPacksIndex() {
  return (
    <PageLayout title='Word Packs' description='Word Packs'>
      <WordPacksContent />
    </PageLayout>
  );
}
