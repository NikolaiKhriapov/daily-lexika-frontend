import { ColorMode, useBreakpointValue, useColorMode } from '@chakra-ui/react';
import styled from 'styled-components';
import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { Status, WordDTO } from '../../src/utils/types';
import { Breakpoint, RoleName, Size } from '../../src/utils/constants';
import Text from '../common/basic/Text';
import StatusBadge from '../common/basic/StatusBadge';
import { theme } from '../../src/utils/theme';
import { borderStyles, mediaBreakpointUp } from '../../src/utils/functions';
import { useAuth } from '../context/AuthContext';

type Props = {
  reviewWordDTO: WordDTO;
  isFlipped: boolean;
  setFlipped: React.Dispatch<React.SetStateAction<boolean>>;
  isThrown: boolean;
  pressButton: any;
  answer: boolean | null;
};

export default function ReviewWordCard(props: Props) {
  const { reviewWordDTO, isFlipped, setFlipped, isThrown, pressButton, answer } = props;

  const { user } = useAuth();
  const { colorMode } = useColorMode();
  const [deltaX, setDeltaX] = useState(0);
  const [deltaY, setDeltaY] = useState(0);
  const [isFollowingSwipe, setFollowingSwipe] = useState(false);

  const swipeDistance = useBreakpointValue({ base: 150, md: 400, xl: 700 });
  const swipeHandlers = useSwipeable({
    onSwipedLeft: (eventData) => {
      if (eventData.absX > swipeDistance!) pressButton(false);
    },
    onSwipedRight: (eventData) => {
      if (eventData.absX > swipeDistance!) pressButton(true);
    },
    delta: 1,
    onSwipeStart: () => setFollowingSwipe(true),
    onSwiping: (eventData) => {
      setDeltaX(eventData.deltaX);
      setDeltaY(eventData.deltaY);
    },
    onTouchEndOrOnMouseUp: () => {
      setFollowingSwipe(false);
      setDeltaX(0);
      setDeltaY(0);
    },
  });

  const wordDataCh = {
    pinyin: {
      text: reviewWordDTO.pinyin,
      size: { base: Size.XL, md: Size.XXL, xl: Size.XXXL },
    },
    nameChineseSimplified: {
      text: reviewWordDTO.nameChineseSimplified,
      size: { base: Size.XXXXXL, md: Size.XXXXXXL, xl: Size.XXXXXXL },
    },
    nameEnglish: {
      text: reviewWordDTO.nameEnglish,
      size: { base: Size.MD, md: Size.XL, xl: Size.XL },
    },
  };

  const wordDataEn = {
    nameEnglish: {
      text: reviewWordDTO.nameEnglish,
      size: { base: Size.XXL, md: Size.XXXXL, xl: Size.XXXXL },
    },
    nameRussian: {
      text: reviewWordDTO.nameRussian,
      size: { base: Size.LG, md: Size.XXL, xl: Size.XXL },
    },
  };

  const isNewStatus = reviewWordDTO.status.toString() === Status[Status.NEW];

  const isThrownDistance = useBreakpointValue({ base: '350px', md: '550px', xl: '700px' });
  const dynamicStyles = {
    transform: `${isFollowingSwipe
      ? isFlipped
        ? `rotateY(180deg) scaleX(-1) translateX(${deltaX}px) translateY(${deltaY}px)`
        : `rotateY(0deg) translateX(${deltaX}px) translateY(${deltaY}px)`
      : isFlipped
        ? `rotateY(180deg) scaleX(-1)`
        : `rotateY(0deg)`
    } ${isThrown 
      ? answer
        ? `rotateY(0deg) translateX(${isThrownDistance}) translateY(0px)`
        : `rotateY(0deg) translateX(-${isThrownDistance}) translateY(0px)`
      : ''
    }`,
    transition: `${isFollowingSwipe ? 'transform 0s' : 'transform 0.3s'}
     ${isThrown ? 'transform 0.6s' : ''}`,
  };

  return (
    <Container
      style={dynamicStyles}
      $colorMode={colorMode}
      $isNewStatus={isNewStatus}
      {...swipeHandlers}
      onClick={() => setFlipped(!isFlipped)}
    >
      {isNewStatus && <StatusBadge text={reviewWordDTO.status} colorScheme="red" isInTopRight />}
      {user?.role === RoleName.USER_CHINESE && (
        <ContentsContainer>
          <Text size={isFlipped ? wordDataCh.pinyin.size : wordDataCh.nameChineseSimplified.size}>
            {isFlipped ? wordDataCh.pinyin.text : wordDataCh.nameChineseSimplified.text}
          </Text>
          {isFlipped && (
            <Text size={wordDataCh.nameEnglish.size}>
              {wordDataCh.nameEnglish.text}
            </Text>
          )}
        </ContentsContainer>
      )}
      {user?.role === RoleName.USER_ENGLISH && (
        <ContentsContainer>
          <Text size={isFlipped ? wordDataEn.nameRussian.size : wordDataEn.nameEnglish.size}>
            {isFlipped ? wordDataEn.nameRussian.text : wordDataEn.nameEnglish.text}
          </Text>
        </ContentsContainer>
      )}
    </Container>
  );
}

const Container = styled.div<{ $colorMode: ColorMode, $isNewStatus: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 240px;
  height: calc(240px * 1.3);
  padding: 10px;

  background-color: ${({ $colorMode }) => theme.colors[$colorMode].reviewWordCardBgColor};
  border: ${({ $colorMode }) => borderStyles($colorMode)};
  border-radius: ${theme.stylesToDelete.borderRadius};
  border-color: ${({ $colorMode, $isNewStatus }) => ($isNewStatus
          && theme.colors[$colorMode].reviewWordCardBadgeRedColor
  )};

  ${mediaBreakpointUp('400px')} {
    height: 370px;
    width: calc(375px / 1.3);
  }

  ${mediaBreakpointUp(Breakpoint.TABLET)} {
    width: 400px;
    height: calc(400px * 1.3);
  }
`;

const ContentsContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 60px;
  text-align: center;
  justify-content: center;
`;
