import { Spinner as ChakraSpinner } from '@chakra-ui/react';
import { Size } from '../../utils/constants/constants';

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
