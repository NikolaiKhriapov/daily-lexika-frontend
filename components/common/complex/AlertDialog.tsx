import {
  AlertDialog as ChakraAlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader,
  AlertDialogOverlay, ColorMode, useColorMode,
} from '@chakra-ui/react';
import styled from 'styled-components';
import React from 'react';
import { ButtonType } from '../../../src/utils/constants';
import { theme } from '../../../src/utils/theme';
import { borderStyles } from '../../../src/utils/functions';
import Button from '../basic/Button';

type Props = {
  isOpenDeleteButton: boolean;
  onCloseDeleteButton: () => void;
  cancelRef: React.RefObject<HTMLButtonElement>;
  handleDelete: () => void;
  header: string;
  body: string;
  deleteButtonText: string;
  isButtonDisabled: boolean;
};

export default function AlertDialog(props: Props) {
  const { isOpenDeleteButton, onCloseDeleteButton, cancelRef, handleDelete, header, body, deleteButtonText, isButtonDisabled } = props;

  const { colorMode } = useColorMode();

  return (
    <ChakraAlertDialog
      isOpen={isOpenDeleteButton}
      onClose={onCloseDeleteButton}
      leastDestructiveRef={cancelRef}
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContentStyled $colorMode={colorMode}>
          <AlertDialogHeader>{header}</AlertDialogHeader>
          <AlertDialogBody>{body}</AlertDialogBody>
          <AlertDialogFooterStyled>
            <Button
              buttonText='Cancel'
              buttonType={ButtonType.BUTTON}
              onClick={onCloseDeleteButton}
              isDisabled={isButtonDisabled}
            />
            <Button
              buttonText={deleteButtonText}
              buttonType={ButtonType.BUTTON_RED}
              onClick={handleDelete}
              isDisabled={isButtonDisabled}
            />
          </AlertDialogFooterStyled>
        </AlertDialogContentStyled>
      </AlertDialogOverlay>
    </ChakraAlertDialog>
  );
}

const AlertDialogFooterStyled = styled(AlertDialogFooter)`
  display: flex;
  justify-content: right;
  gap: 20px;
`;

const AlertDialogContentStyled = styled(AlertDialogContent)<{ $colorMode: ColorMode }>`
  border: ${({ $colorMode }) => borderStyles($colorMode)};
  border-radius: ${theme.stylesToDelete.borderRadius};
  background-color: ${({ $colorMode }) => theme.colors[$colorMode].bgColor} !important;
  width: fit-content !important;
  max-width: 90% !important;
`;
