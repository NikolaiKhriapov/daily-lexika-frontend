import React from 'react';
import { FaCheck } from 'react-icons/fa';
import styled from 'styled-components';
import { ColorMode, useColorMode } from '@chakra-ui/react';
import { Size } from '@utils/constants';
import { borderStyles } from '@utils/functions';
import { theme } from '@utils/theme';
import Text from '@components/common/basic/Text';

export default function SignAdded() {
  const { colorMode } = useColorMode();

  return (
    <Component $colorMode={colorMode}>
      <FaCheck />
      <Text size={Size.SM}>&nbsp;&nbsp;Added</Text>
    </Component>
  );
}

const Component = styled.div<{ $colorMode: ColorMode }>`
  width: 90px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 6px;
  border: ${({ $colorMode }) => borderStyles($colorMode)};
  border-radius: ${theme.stylesToDelete.borderRadius};
`;
