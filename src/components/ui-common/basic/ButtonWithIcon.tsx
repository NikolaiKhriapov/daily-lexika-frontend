import React, { ReactNode } from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import { BiMessageSquareError } from 'react-icons/bi';
import { CiEdit, CiSquareMinus, CiSquarePlus } from 'react-icons/ci';
import { GoTrash } from 'react-icons/go';
import { HiOutlineSpeakerWave } from 'react-icons/hi2';
import { SlRefresh } from 'react-icons/sl';
import { VscInfo } from 'react-icons/vsc';
import styled from 'styled-components';
import { ColorMode, IconButton, useColorMode } from '@chakra-ui/react';
import { borderStyles } from '@utils/functions';
import { theme } from '@utils/theme';

export enum ButtonWithIconType {
  PREVIEW = 'preview',
  CHANGE = 'change',
  REFRESH = 'refresh',
  DELETE = 'delete',
  ADD_WORD = 'add-word',
  REMOVE_WORD = 'remove-word',
  INFO = 'info',
  AUDIO = 'audio',
  ERROR = 'error',
}

type Props = {
  type: ButtonWithIconType,
  onClick: any,
  isDisabled?: boolean,
  isLoading?: boolean,
  isOpen?: boolean,
  modalContent?: ReactNode,
};

export default function ButtonWithIcon(props: Props) {
  const { type, onClick, isDisabled = false, isLoading = false, isOpen = false, modalContent } = props;

  const { colorMode } = useColorMode();

  const icon = {
    [ButtonWithIconType.PREVIEW]: <AiOutlineEye size={20} />,
    [ButtonWithIconType.CHANGE]: <CiEdit size={20} />,
    [ButtonWithIconType.REFRESH]: <SlRefresh size={20} />,
    [ButtonWithIconType.DELETE]: <GoTrash size={20} />,
    [ButtonWithIconType.ADD_WORD]: <CiSquarePlus size={20} />,
    [ButtonWithIconType.REMOVE_WORD]: <CiSquareMinus size={20} />,
    [ButtonWithIconType.INFO]: <VscInfo size={20} />,
    [ButtonWithIconType.AUDIO]: <HiOutlineSpeakerWave size={20} />,
    [ButtonWithIconType.ERROR]: <BiMessageSquareError size={20} />,
  };

  return (
    <>
      <IconButtonStyled
        icon={icon[type]}
        onClick={onClick}
        aria-label={`${type.toLowerCase()}-button`}
        isDisabled={isDisabled}
        isLoading={isLoading}
        $type={type}
        $colorMode={colorMode}
      />
      {isOpen && modalContent}
    </>
  );
}

const IconButtonStyled = styled(IconButton)<{ $type: ButtonWithIconType; $colorMode: ColorMode }>`
  border: ${({ $colorMode }) => borderStyles($colorMode)};
  
  &:hover {
    background-color: ${({ $type, $colorMode }) =>
    $type === ButtonWithIconType.DELETE && theme.colors[$colorMode].buttonRemoveHoverBgColor} !important;
  }
`;
