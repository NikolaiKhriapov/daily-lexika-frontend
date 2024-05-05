import { Skeleton as ChakraSkeleton, SkeletonProps, useColorMode } from '@chakra-ui/react';
import { borderStyles } from '@utils/functions';
import { theme } from '@utils/theme';

export default function Skeleton(props: SkeletonProps) {
  const { height, width, ...rest } = props;

  const { colorMode } = useColorMode();

  return (
    <ChakraSkeleton
      startColor={theme.colors[colorMode].cardAddNew}
      endColor={theme.colors[colorMode].bgColor}
      border={borderStyles(colorMode)}
      borderRadius={theme.stylesToDelete.borderRadius}
      height={height}
      width={width}
      {...rest}
    />
  );
}
