import React, { ReactNode } from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import { CiEdit, CiSquareMinus, CiSquarePlus } from 'react-icons/ci';
import { GoTrash } from 'react-icons/go';
import { SlRefresh } from 'react-icons/sl';
import styled from 'styled-components';
import { ColorMode, IconButton, useColorMode } from '@chakra-ui/react';
import { ButtonWithIconType } from '@utils/constants';
import { theme } from '@utils/theme';

type Props = {
  type: ButtonWithIconType,
  onClick: any,
  isDisabled?: boolean,
  isOpen?: boolean,
  modalContent?: ReactNode,
};

export default function ButtonWithIcon(props: Props) {
  const { type, onClick, isDisabled = false, isOpen = false, modalContent } = props;

  const { colorMode } = useColorMode();

  const icon = {
    [ButtonWithIconType.PREVIEW]: <AiOutlineEye size={20} />,
    [ButtonWithIconType.CHANGE]: <CiEdit size={20} />,
    [ButtonWithIconType.REFRESH]: <SlRefresh size={20} />,
    [ButtonWithIconType.DELETE]: <GoTrash size={20} />,
    [ButtonWithIconType.ADD_WORD]: <CiSquarePlus size={20} />,
    [ButtonWithIconType.REMOVE_WORD]: <CiSquareMinus size={20} />,
  };

  return (
    <>
      <IconButtonStyled
        icon={icon[type]}
        onClick={onClick}
        aria-label={`${type.toLowerCase()}-button`}
        isDisabled={isDisabled}
        $type={type}
        $colorMode={colorMode}
      />
      {isOpen && modalContent}
    </>
  );
}

const IconButtonStyled = styled(IconButton)<{ $type: ButtonWithIconType; $colorMode: ColorMode }>`
  &:hover {
    background-color: ${({ $type, $colorMode }) =>
    $type === ButtonWithIconType.DELETE && theme.colors[$colorMode].buttonRemoveHoverBgColor} !important;
  }
`;
