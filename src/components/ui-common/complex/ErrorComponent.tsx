import Heading from '@components/ui-common/basic/Heading';
import IndexPageContainer from '@components/ui-common/complex/IndexPageContainer';

export default function ErrorComponent() {
  return (
    <IndexPageContainer>
      <Heading isCentered>Oops, something went wrong...</Heading>
    </IndexPageContainer>
  );
}
