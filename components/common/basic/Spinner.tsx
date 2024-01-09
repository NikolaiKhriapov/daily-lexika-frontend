import { Spinner as ChakraSpinner } from '@chakra-ui/react';
import { Size } from '../../../src/utils/constants';

export default function Spinner() {
  return (
    <ChakraSpinner
      marginTop='100px'
      thickness='2px'
      speed='0.3s'
      size={Size.XL}
    />
  );
}
