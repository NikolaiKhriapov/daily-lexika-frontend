import Heading from '@components/common/basic/Heading';
import IndexPageContainer from '@components/common/complex/IndexPageContainer';

export default function ErrorComponent() {
  return (
    <IndexPageContainer>
      <Heading isCentered>Oops, there was an error</Heading>
    </IndexPageContainer>
  );
}
