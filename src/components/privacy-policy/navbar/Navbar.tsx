import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AppInfo } from '@utils/app/constants';
import { Breakpoint, FontWeight, Size } from '@utils/constants';
import { mediaBreakpointUp } from '@utils/functions';
import { theme } from '@utils/theme';
import Link from '@components/ui-common/basic/Link';
import Text from '@components/ui-common/basic/Text';

export default function Navbar() {
  const [isScrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 330;
      if (scrolled !== isScrolled) {
        setScrolled(scrolled);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isScrolled]);

  return (
    <Container $isScrolled={isScrolled}>
      <SectionsContainer>
        <Section>
          <Text>Daily Lexika</Text>
        </Section>
        {isScrolled && (
          <Section>
            <Text fontWeight={FontWeight.SEMIBOLD}>Privacy Policy</Text>
          </Section>
        )}
        <Section>
          <Link href={`mailto:${AppInfo.EMAIL}`} fontSize={Size.SM}>
            <Text color={theme.colors.textBlack}>Contact us</Text>
          </Link>
        </Section>
      </SectionsContainer>
    </Container>
  );
}

const Container = styled.div<{ $isScrolled: boolean }>`
  display: none;

  ${mediaBreakpointUp(Breakpoint.TABLET)} {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 70px;
    background-color: ${theme.colors.light.background};
    z-index: 1000;
    box-shadow: ${({ $isScrolled }) => ($isScrolled ? theme.stylesToDelete.light.boxShadow : 'none')};
  }
`;

const SectionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  margin: 0 60px;

  ${mediaBreakpointUp(Breakpoint.DESKTOP)} {
    margin: 0 100px;
  }
`;

const Section = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  ${mediaBreakpointUp(Breakpoint.TABLET)} {
    gap: 10px;
  }
`;
