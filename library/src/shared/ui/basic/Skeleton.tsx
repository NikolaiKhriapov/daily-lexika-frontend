import { Skeleton as ChakraSkeleton, SkeletonProps, useColorMode } from '@chakra-ui/react';
import { borderStyles } from '../../utils/ui/functions';
import { theme } from '../../utils/utils/theme';

export function Skeleton(props: SkeletonProps) {
  const { height, width, ...rest } = props;

  const { colorMode } = useColorMode();

  return (
    <ChakraSkeleton
      startColor={theme.colors[colorMode].skeletonStart}
      endColor={theme.colors[colorMode].skeletonEnd}
      border={borderStyles(colorMode)}
      borderRadius={theme.stylesToDelete.borderRadius}
      height={height}
      width={width}
      {...rest}
    />
  );
}
