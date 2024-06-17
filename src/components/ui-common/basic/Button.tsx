import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { Button as ChakraButton, ButtonProps, ColorMode, useColorMode } from '@chakra-ui/react';
import { ButtonType, FontWeight } from '@utils/constants';
import { borderStyles, nonHighlightableTap } from '@utils/functions';
import { theme } from '@utils/theme';

interface Props extends ButtonProps {
  buttonType: ButtonType;
  buttonText: React.ReactNode;
  isDisabled?: boolean,
  isOpen?: boolean,
  modalContent?: ReactNode,
}

export default function Button(props: Props) {
  const { buttonType, buttonText, isDisabled = false, isOpen = false, modalContent, ...rest } = props;

  const { colorMode } = useColorMode();

  const getButtonType = () => {
    switch (buttonType) {
      case ButtonType.SUBMIT:
        return 'submit';
      case ButtonType.RESET:
        return 'reset';
      default:
        return 'button';
    }
  };

  if (buttonType === ButtonType.LINK) {
    return (
      <>
        <ChakraButton
          variant={ButtonType.LINK}
          color={theme.stylesToDelete.link}
          fontWeight={FontWeight.NORMAL}
          isDisabled={isDisabled}
          aria-label={buttonType}
          {...rest}
        >
          {buttonText}
        </ChakraButton>
        {isOpen && modalContent}
      </>
    );
  }

  return (
    <>
      <ChakraButtonStyled
        className={`${buttonType}`}
        type={getButtonType()}
        $colorMode={colorMode}
        isDisabled={isDisabled}
        aria-label={buttonType}
        {...rest}
      >
        {buttonText}
      </ChakraButtonStyled>
      {isOpen && modalContent}
    </>
  );
}

const ChakraButtonStyled = styled(ChakraButton)<{ $colorMode: ColorMode }>`
  color: ${({ $colorMode }) => theme.colors[$colorMode].buttonColor};
  background-color: ${({ $colorMode }) => theme.colors[$colorMode].buttonBgColor};
  border: ${({ $colorMode }) => borderStyles($colorMode)};
  min-width: fit-content !important;
  ${nonHighlightableTap};

  &.redOnHover:hover {
    background-color: ${({ $colorMode }) => theme.colors[$colorMode].buttonRemoveHoverBgColor};
  }
`;
