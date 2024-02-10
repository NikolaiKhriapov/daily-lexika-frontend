import styled from 'styled-components';
import { useRadio, UseRadioProps } from '@chakra-ui/radio';
import { Box, ColorMode, useColorMode } from '@chakra-ui/react';
import { Size } from '@utils/constants';
import { borderStyles, nonHighlightableTap } from '@utils/functions';
import { theme } from '@utils/theme';

export default function RadioItem(props: UseRadioProps) {
  const { name } = props;

  const { colorMode } = useColorMode();
  const { getInputProps, getRadioProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as="label">
      <input {...input} />
      <BoxStyled
        {...checkbox}
        $colorMode={colorMode}
        boxShadow={Size.MD}
        _checked={{ bg: theme.colors[colorMode].buttonBgColor, color: theme.colors[colorMode].buttonColor, border: borderStyles(colorMode) }}
      >
        {name}
      </BoxStyled>
    </Box>
  );
}

const BoxStyled = styled(Box)<{ $colorMode: ColorMode }>`
  border: ${({ $colorMode }) => borderStyles($colorMode)};
  border-radius: calc(${theme.stylesToDelete.borderRadius} / 1.5);
  padding: 7px 15px;
  cursor: pointer;
  ${nonHighlightableTap};
`;

