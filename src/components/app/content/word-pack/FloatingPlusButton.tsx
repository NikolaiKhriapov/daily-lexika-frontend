import React from 'react';
import { RxCardStackPlus, RxCross1 } from 'react-icons/rx';
import styled from 'styled-components';
import { ColorMode, useBreakpointValue, useColorMode, useDisclosure } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '@store/hooks/hooks';
import { toggleExpanded } from '@store/reducers/app/floatingPlusButtonSlice';
import { Breakpoint, Size } from '@utils/constants';
import { mediaBreakpointUp } from '@utils/functions';
import { theme } from '@utils/theme';
import CreateWordPackWindow from '@components/app/content/word-pack/CreateWordPackWindow';
import Text from '@components/ui-common/basic/Text';

export default function FloatingPlusButton() {
  const dispatch = useAppDispatch();
  const { colorMode } = useColorMode();
  const { isExpanded } = useAppSelector((state) => state.floatingPlusButtonSlice);
  const { isOpen: isOpenCreateButton, onOpen: onOpenCreateButton, onClose: onCloseCreateButton } = useDisclosure();

  const optionIconSize = useBreakpointValue({ base: 20, xl: 25 });
  const optionsMapping = [
    {
      icon: <RxCardStackPlus size={optionIconSize} style={{ rotate: '90deg' }} color={theme.colors[colorMode].buttonColor} />,
      text: 'Add\u00a0new\u00a0word\u00a0pack',
      onClick: onOpenCreateButton,
    },
  ];

  return (
    <Container>
      <FloatingOptionsContainer>
        {optionsMapping.map((option, index) => (
          <FloatingOptionContainer key={index} $order={optionsMapping.length - index} $isVisible={isExpanded}>
            <FloatingIcon $colorMode={colorMode} onClick={onOpenCreateButton}>
              {option.icon}
            </FloatingIcon>
            <FloatingText size={{ base: Size.SM, md: Size.SM, xl: Size.MD }} $colorMode={colorMode} $isVisible={isExpanded}>
              {option.text}
            </FloatingText>
          </FloatingOptionContainer>
        ))}
      </FloatingOptionsContainer>

      <FloatingButton $colorMode={colorMode} onClick={() => dispatch(toggleExpanded())}>
        <CrossIcon $colorMode={colorMode} $isVisible={isExpanded} strokeWidth={1} />
      </FloatingButton>

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

const FloatingOptionsContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const FloatingButton = styled.button<{ $colorMode: ColorMode }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 50px;
  border-radius: 100%;
  box-shadow: ${({ $colorMode }) => theme.stylesToDelete[$colorMode].boxShadowButton};
  background-color: ${({ $colorMode }) => theme.colors[$colorMode].cardAddNew};
  transition: background-color 0.3s ease-in-out;
  z-index: 1000;

  ${mediaBreakpointUp(Breakpoint.DESKTOP)} {
    height: 70px;
    width: 70px;
  }
`;

const CrossIcon = styled(RxCross1)<{ $colorMode: ColorMode; $isVisible: boolean }>`
  color: ${({ $isVisible, $colorMode }) => ($isVisible ? theme.colors[$colorMode].buttonColor : theme.colors.mainBlue)};
  height: 20px;
  width: 20px;
  transform: ${({ $isVisible }) => !$isVisible && 'rotate(135deg)'};
  transition: transform 0.3s ease-in-out, color 0.3s ease-in-out;
    
  ${mediaBreakpointUp(Breakpoint.DESKTOP)} {
    height: 25px;
    width: 25px;
  }
`;

const FloatingOptionContainer = styled.div<{ $order: number; $isVisible: boolean }>`
  position: absolute;
  bottom: ${({ $order, $isVisible }) => ($isVisible ? `calc(15px + ${50 * $order}px)` : '5px')};
  height: 40px;
  width: 40px;
  border-radius: 100%;
  transition: bottom ease 0.3s;

  ${mediaBreakpointUp(Breakpoint.DESKTOP)} {
    bottom: ${({ $order, $isVisible }) => ($isVisible ? `calc(15px + ${70 * $order}px)` : '5px')};
    height: 60px;
    width: 60px;
  }
`;

const FloatingIcon = styled.div<{ $colorMode: ColorMode }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
  box-shadow: ${({ $colorMode }) => theme.stylesToDelete[$colorMode].boxShadowButton};
  border-radius: 100%;
  background-color: ${({ $colorMode }) => theme.colors[$colorMode].cardAddNew};
  cursor: pointer;
    
  ${mediaBreakpointUp(Breakpoint.DESKTOP)} {
    height: 60px;
    width: 60px;
  }
`;

const FloatingText = styled(Text)<{ $colorMode: ColorMode; $isVisible: boolean }>`
  position: absolute;
  right: 50px;
  bottom: 15%;
  padding: 3px 10px;
  border-radius: 15px;
  background-color: ${({ $colorMode }) => theme.colors[$colorMode].cardAddNew};
  box-shadow: ${({ $colorMode }) => theme.stylesToDelete[$colorMode].boxShadowButton};
  opacity: ${({ $isVisible }) => ($isVisible ? '100%' : '0')};
  transition: opacity ease-out 0.3s;

  ${mediaBreakpointUp(Breakpoint.DESKTOP)} {
    right: 70px;
    bottom: 25%;
  }
`;
