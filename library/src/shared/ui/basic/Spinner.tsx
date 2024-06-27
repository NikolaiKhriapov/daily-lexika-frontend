import { Spinner as ChakraSpinner } from '@chakra-ui/react';
import { Size } from '@library/shared/utils';

type Props = {
  size?: Size;
};

export function Spinner(props: Props) {
  const { size = Size.XL } = props;
  return (
    <ChakraSpinner
      thickness='2px'
      speed='0.3s'
      size={size}
    />
  );
}
