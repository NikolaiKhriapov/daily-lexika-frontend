import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { ColorMode, useColorMode } from '@chakra-ui/react';
import { Breakpoint, FontWeight, Size } from '@utils/constants';
import { borderStyles, mediaBreakpointUp, nonSelectableText } from '@utils/functions';
import { theme } from '@utils/theme';
import Text from '@components/ui-common/basic/Text';

export enum ComingSoonType {
  TEXT = 'TEXT',
  BADGE = 'BADGE',
}

interface Props {
  type: ComingSoonType;
}

export default function ComingSoon(props: Props) {
  const { type } = props;

  const { colorMode } = useColorMode();
  const { t } = useTranslation();

  switch (type) {
    case ComingSoonType.TEXT:
      return <TextStyled fontWeight={FontWeight.SEMIBOLD} isCentered opacity='50%'>{t('ComingSoon.text')}</TextStyled>;
    case ComingSoonType.BADGE:
      return (
        <BadgeContainer $colorMode={colorMode} style={{ whiteSpace: 'nowrap' }}>
          <Text fontSize={Size.XS} isCentered opacity='50%'>{t('ComingSoon.badge')}</Text>
        </BadgeContainer>
      );
    default:
      return <></>;
  }
}

const BadgeContainer = styled.div<{ $colorMode: ColorMode }>`
  width: min-content;
  padding: 2px 6px;
  background-color: ${({ $colorMode }) => theme.colors[$colorMode].background2};
  border: ${({ $colorMode }) => borderStyles($colorMode)};
  border-radius: ${theme.stylesToDelete.borderRadius};
  z-index: 1000;

  ${mediaBreakpointUp(Breakpoint.DESKTOP)} {
    padding: 3px 10px;
  }
`;

const TextStyled = styled(Text)`
  ${nonSelectableText} !important;
`;
