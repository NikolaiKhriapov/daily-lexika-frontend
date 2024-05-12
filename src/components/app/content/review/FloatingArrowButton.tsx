import React from 'react';
import { IoArrowDownOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { ColorMode, useColorMode } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '@store/hooks/hooks';
import { setExpanded } from '@store/reducers/app/floatingPlusButtonSlice';
import { Breakpoint, Page } from '@utils/constants';
import { mediaBreakpointUp } from '@utils/functions';
import { theme } from '@utils/theme';

export enum ArrowDirection {
  UP = 'UP',
  DOWN = 'DOWN',
}

interface Props {
  arrowDirection: ArrowDirection;
  setAnimateTrue: any;
  setAnimateFalse: any;
  targetPage: Page;
  order?: number;
}

export default function FloatingArrowButton(props: Props) {
  const { arrowDirection, setAnimateTrue, setAnimateFalse, targetPage, order = 1 } = props;

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { colorMode } = useColorMode();
  const { isExpanded } = useAppSelector((state) => state.floatingPlusButtonSlice);

  const getHeight = 90 + (65 * (order - 1)) + (isExpanded ? 65 : 0);

  const handleClick = () => {
    dispatch(setExpanded(false));
    setAnimateTrue();
    router.push(targetPage);
    setTimeout(() => setAnimateFalse(), 500);
  };

  return (
    <Container $bottom={getHeight}>
      <FloatingButton onClick={handleClick} $colorMode={colorMode} onAnimationEnd={setAnimateFalse}>
        <ArrowIcon $direction={arrowDirection}>
          <IoArrowDownOutline size={30} />
        </ArrowIcon>
      </FloatingButton>
    </Container>
  );
}

const Container = styled.div<{ $bottom: number }>`
  position: fixed;
  display: flex;
  flex-direction: column;
  right: 20px;
  bottom: ${({ $bottom }) => `${$bottom}px`};
  transition: bottom 0.3s ease;
  z-index: 1000;
  
  ${mediaBreakpointUp(Breakpoint.DESKTOP)} {
    bottom: 60px;
    right: 4.5%;
  }
`;

const FloatingButton = styled.div<{ $colorMode: ColorMode }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 50px;
  border-radius: 100%;
  z-index: 1000;
  box-shadow: ${({ $colorMode }) => theme.stylesToDelete[$colorMode].boxShadowButton};
  background-color: ${({ $colorMode }) => theme.colors[$colorMode].cardAddNew};
  transition: background-color 0.3s ease-in-out;
  cursor: pointer;

  ${mediaBreakpointUp(Breakpoint.DESKTOP)} {
    height: 70px;
    width: 70px;
  }
`;

const ArrowIcon = styled.div<{ $direction: ArrowDirection }>`
  color: ${theme.colors.mainBlue};
  height: 30px;
  width: 30px;
  transform: ${({ $direction }) => ($direction === ArrowDirection.UP ? 'rotate(180deg)' : 'rotate(0deg)')};
    
  ${mediaBreakpointUp(Breakpoint.DESKTOP)} {
    height: 35px;
    width: 35px;
  }
`;
