import {
  CircularProgress, CircularProgressLabel, CircularProgressProps, useBreakpointValue, useColorMode,
} from '@chakra-ui/react';
import { FontWeight, Size } from '@utils/constants';
import { theme } from '@utils/theme';
import Text from '@components/ui-common/basic/Text';
import { nonSelectableText } from '@utils/functions';
import styled from 'styled-components';

interface Props extends CircularProgressProps {
  text: string;
  isWithLabel?: boolean;
}

export default function ProgressCircular(props: Props) {
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
          <Text size={{ base: Size.XS, md: Size.MD, xl: Size.MD }} fontWeight={FontWeight.SEMIBOLD}>{text}</Text>
        </CircularProgressLabel>
      )}
    </CircularProgressStyled>
  );
}

const CircularProgressStyled = styled(CircularProgress)`
  ${nonSelectableText};
`;
