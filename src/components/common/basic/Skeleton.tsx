import { Skeleton as ChakraSkeleton, SkeletonProps, useColorMode } from '@chakra-ui/react';
import { borderStyles } from '@utils/functions';
import { theme } from '@utils/theme';

export enum SkeletonType {
  DEFAULT = 'DEFAULT',
  REVIEW_CARD = 'REVIEW_CARD',
  WORD_PACK_CARD = 'WORD_PACK_CARD',
  STATS_CARD = 'STATS_CARD',
}

interface Props extends SkeletonProps {
  type: SkeletonType;
}

export default function Skeleton(props: Props) {
  const { type, ...rest } = props;
  let { height, width, border, borderRadius } = props;

  const { colorMode } = useColorMode();

  switch (type) {
    case SkeletonType.REVIEW_CARD: {
      height = 280;
      width = 215;
      border = borderStyles(colorMode);
      borderRadius = theme.stylesToDelete.borderRadius;
      break;
    }
    case SkeletonType.WORD_PACK_CARD: {
      height = 280;
      width = 215;
      border = borderStyles(colorMode);
      borderRadius = theme.stylesToDelete.borderRadius;
      break;
    }
    case SkeletonType.STATS_CARD: {
      height = 100;
      width = 220;
      border = borderStyles(colorMode);
      borderRadius = theme.stylesToDelete.borderRadius;
      break;
    }
    default:
      break;
  }

  return (
    <ChakraSkeleton
      startColor={theme.colors[colorMode].cardAddNew}
      endColor={theme.colors[colorMode].bgColor}
      border={border}
      borderRadius={borderRadius}
      height={height}
      width={width}
      {...rest}
    />
  );
}
