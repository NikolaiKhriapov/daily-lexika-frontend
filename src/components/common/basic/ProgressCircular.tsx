import {
  CircularProgress, CircularProgressLabel, CircularProgressProps, useBreakpointValue, useColorMode,
} from '@chakra-ui/react';
import { FontWeight, Size } from '@utils/constants';
import { theme } from '@utils/theme';
import Text from '@components/common/basic/Text';

interface Props extends CircularProgressProps {
  text: string;
  isWithLabel?: boolean;
}

ProgressCircular.defaultProps = {
  isWithLabel: false,
};

export default function ProgressCircular({ value, text, isWithLabel, ...rest }: Props) {
  const { colorMode } = useColorMode();

  return (
    <CircularProgress
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
    </CircularProgress>
  );
}
