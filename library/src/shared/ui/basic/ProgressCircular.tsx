import styled from 'styled-components';
import {
  CircularProgress, CircularProgressLabel, CircularProgressProps, useBreakpointValue, useColorMode,
} from '@chakra-ui/react';

import { Text } from './Text';
import { FontWeight, nonSelectableText, Size, theme } from '@library/shared/utils';

interface Props extends CircularProgressProps {
  text: string;
  isWithLabel?: boolean;
}

export function ProgressCircular(props: Props) {
  const { value, text, isWithLabel = false, ...rest } = props;
  const { colorMode } = useColorMode();

  return (
    <CircularProgressStyled
      value={value}
      size={useBreakpointValue({ base: '105px', md: '175px', xl: '175px' })}
      thickness='6px'
      color={theme.colors[colorMode].progressCircularColor}
      trackColor={theme.colors[colorMode].progressBarBgColor}
      {...rest}
    >
      {isWithLabel && (
        <CircularProgressLabel>{value}%
          <TextContainer>
            <TextStyled size={{ base: Size.XS, md: Size.MD, xl: Size.MD }} fontWeight={FontWeight.SEMIBOLD}>{text}</TextStyled>
          </TextContainer>
        </CircularProgressLabel>
      )}
    </CircularProgressStyled>
  );
}

const CircularProgressStyled = styled(CircularProgress)`
  ${nonSelectableText};
`;

const TextContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const TextStyled = styled(Text)`
  max-width: 90px;
`;
