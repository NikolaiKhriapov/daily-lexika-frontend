import React from 'react';
import { FaCheck } from 'react-icons/fa';
import styled from 'styled-components';
import { ColorMode, useColorMode } from '@chakra-ui/react';
import { borderStyles, FontWeight, Size, theme } from '@library/shared/utils';

import { Text } from '../basic/Text';

type Props = {
  text: string;
  isWithIcon?: boolean;
};

export function ButtonUnavailable(props: Props) {
  const { text, isWithIcon = false } = props;

  const { colorMode } = useColorMode();

  return (
    <Component $colorMode={colorMode} onClick={(event) => event.stopPropagation()}>
      {isWithIcon && <><FaCheck /><Text size={Size.SM}>&nbsp;&nbsp;</Text></>}
      <Text size={Size.SM} fontWeight={FontWeight.MEDIUM}>{text}</Text>
    </Component>
  );
}

const Component = styled.div<{ $colorMode: ColorMode }>`
  width: fit-content;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 5px 12px;
  border: ${({ $colorMode }) => borderStyles($colorMode)};
  border-radius: ${theme.stylesToDelete.borderRadius};
`;
