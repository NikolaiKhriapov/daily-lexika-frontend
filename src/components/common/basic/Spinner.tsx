import { Spinner as ChakraSpinner } from '@chakra-ui/react';
import { Size } from '@utils/constants';

export default function Spinner() {
  return (
    <ChakraSpinner
      thickness='2px'
      speed='0.3s'
      size={Size.XL}
    />
  );
}
