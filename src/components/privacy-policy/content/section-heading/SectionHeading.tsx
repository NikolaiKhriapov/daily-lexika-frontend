import styled from 'styled-components';
import { Breakpoint } from '@utils/constants';
import { mediaBreakpointUp } from '@utils/functions';
import { theme } from '@utils/theme';
import Heading from '@components/ui-common/basic/Heading';

export default function SectionHeading() {
  return (
    <Container>
      <Content>
        <Heading isSingleColorMode>Privacy Policy</Heading>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  background-color: ${theme.colors.light.background};
  width: 100%;
  height: 250px;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 130px 40px 40px;
  
  ${mediaBreakpointUp(Breakpoint.TABLET)} {
    height: 400px;
    padding: 240px 80px 80px;
  }
`;

const Content = styled.div`
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
