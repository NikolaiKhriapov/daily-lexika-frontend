import React from 'react';
import { RxCardStackPlus, RxCross1 } from 'react-icons/rx';
import styled from 'styled-components';
import { ColorMode, useColorMode, useDisclosure } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '@store/hooks/hooks';
import { toggleVisibility } from '@store/reducers/app/floatingPlusSlice';
import { Breakpoint, Size } from '@utils/constants';
import { mediaBreakpointUp } from '@utils/functions';
import { theme } from '@utils/theme';
import CreateWordPackWindow from '@components/app/content/word-pack/CreateWordPackWindow';
import Text from '@components/ui-common/basic/Text';

export default function FloatingPlus() {
  const dispatch = useAppDispatch();
  const { colorMode } = useColorMode();
  const { isVisible } = useAppSelector((state) => state.floatingPlusSlice);
  const { isOpen: isOpenCreateButton, onOpen: onOpenCreateButton, onClose: onCloseCreateButton } = useDisclosure();

  const optionsMapping = [
    {
      icon: <RxCardStackPlus size={25} style={{ rotate: '90deg' }} color={theme.colors[colorMode].buttonColor} />,
      text: 'Add\u00a0new\u00a0word\u00a0pack',
      onClick: onOpenCreateButton,
    },
  ];
  const getHeight = (index: number) => {
    const order = optionsMapping.length - index;
    return `${15 + (70 * order)}px`;
  };

  return (
    <Container>
      <FloatingPlusOptionsContainer>
        {optionsMapping.map((option, index) => (
          <FloatingPlusOptionContainer key={index} $height={getHeight(index)} $isVisible={isVisible}>
            <FloatingIcon $colorMode={colorMode} onClick={onOpenCreateButton}>
              {option.icon}
            </FloatingIcon>
            <FloatingText size={{ base: Size.SM, md: Size.SM, xl: Size.MD }} $colorMode={colorMode} $isVisible={isVisible}>
              {option.text}
            </FloatingText>
          </FloatingPlusOptionContainer>
        ))}
      </FloatingPlusOptionsContainer>

      <FloatingPlusButton $colorMode={colorMode} onClick={() => dispatch(toggleVisibility())}>
        <CrossIcon $colorMode={colorMode} $isVisible={isVisible} strokeWidth={1} />
      </FloatingPlusButton>

      {isOpenCreateButton && <CreateWordPackWindow isOpen={isOpenCreateButton} onClose={onCloseCreateButton} />}
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  bottom: 90px;
  right: 20px;
  z-index: 1000;

  ${mediaBreakpointUp(Breakpoint.DESKTOP)} {
    bottom: 60px;
    right: 4.5%;
  }
`;

const FloatingPlusOptionsContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const FloatingPlusButton = styled.button<{ $colorMode: ColorMode }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 60px;
  width: 60px;
  border-radius: 70px;
  z-index: 1000;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  background-color: ${({ $colorMode }) => theme.colors[$colorMode].cardAddNew};
  transition: background-color 0.3s ease-in-out;

  ${mediaBreakpointUp(Breakpoint.DESKTOP)} {
    height: 70px;
    width: 70px;
  }
`;

const CrossIcon = styled(RxCross1)<{ $colorMode: ColorMode; $isVisible: boolean }>`
  color: ${({ $isVisible, $colorMode }) => ($isVisible ? theme.colors[$colorMode].buttonColor : theme.colors.mainBlue)};
  height: 25px;
  width: 25px;
  transform: ${({ $isVisible }) => !$isVisible && 'rotate(45deg)'};
  transition: transform 0.3s ease-in-out, color 0.3s ease-in-out;
`;

const FloatingPlusOptionContainer = styled.div<{ $height: string; $isVisible: boolean }>`
  position: absolute;
  bottom: ${({ $height, $isVisible }) => ($isVisible ? $height : '5px')};
  height: 50px;
  width: 50px;
  border-radius: 100%;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  transition: bottom ease 0.3s;

  ${mediaBreakpointUp(Breakpoint.DESKTOP)} {
    height: 60px;
    width: 60px;
  }
`;

const FloatingIcon = styled.div<{ $colorMode: ColorMode }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 50px;
  border-radius: 100%;
  background-color: ${({ $colorMode }) => theme.colors[$colorMode].cardAddNew};
    
  ${mediaBreakpointUp(Breakpoint.DESKTOP)} {
    height: 60px;
    width: 60px;
  }
`;

const FloatingText = styled(Text)<{ $colorMode: ColorMode; $isVisible: boolean }>`
  position: absolute;
  right: 60px;
  bottom: 25%;
  padding: 3px 10px;
  border-radius: 15px;
  background-color: ${({ $colorMode }) => theme.colors[$colorMode].cardAddNew};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  opacity: ${({ $isVisible }) => ($isVisible ? '100%' : '0')};
  transition: opacity ease-out 0.3s;

  ${mediaBreakpointUp(Breakpoint.DESKTOP)} {
    right: 70px;
  }
`;
