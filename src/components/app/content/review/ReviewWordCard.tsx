import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import styled from 'styled-components';
import { useBreakpointValue, useColorMode } from '@chakra-ui/react';
import { useGetUserInfoQuery } from '@store/api/userAPI';
import { RoleName } from '@utils/app/constants';
import { Size } from '@utils/constants';
import { theme } from '@utils/theme';
import { Status, WordDto } from '@utils/types';
import WordCard from '@components/app/content/review/WordCard';

type Props = {
  reviewWord?: WordDto | null;
  isFlipped: boolean;
  setFlipped: React.Dispatch<React.SetStateAction<boolean>>;
  setUnlocked: React.Dispatch<React.SetStateAction<boolean>>;
  isThrown: boolean;
  pressButton: (answer: boolean | null) => void;
  isLoading: boolean;
};

export default function ReviewWordCard(props: Props) {
  const { reviewWord = null, isFlipped, setFlipped, setUnlocked, isThrown, pressButton, isLoading } = props;

  const { colorMode } = useColorMode();
  const [deltaX, setDeltaX] = useState(0);
  const [deltaY, setDeltaY] = useState(0);
  const [isFollowingSwipe, setFollowingSwipe] = useState(false);

  const { data: user } = useGetUserInfoQuery();

  const cardHeight = { base: '312px', sm: '390px', xl: '520px' };
  const cardWidth = { base: '240px', sm: '300px', xl: '400px' };

  const swipeDistance = 150;
  const swipeHandlers = useSwipeable({
    onSwipedLeft: (eventData) => {
      if (eventData.absX > swipeDistance!) pressButton(false);
      if (!isLoading) {
        setDeltaX(0);
        setDeltaY(0);
      }
    },
    onSwipedRight: (eventData) => {
      if (eventData.absX > swipeDistance!) pressButton(true);
      if (!isLoading) {
        setDeltaX(0);
        setDeltaY(0);
      }
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

  if (!user || !reviewWord) return <ReviewWordPlaceholderContainer $height={cardHeight} />;

  const wordDataSize = {
    [RoleName.USER_ENGLISH]: {
      nameWord: {
        size: { base: Size.XL, sm: Size.XXL, xl: Size.XXXXL },
        font: theme.fonts.body,
      },
      transcriptionSize: { base: Size.SM, sm: Size.MD, xl: Size.XL },
      nameTranslationSize: { base: Size.MD, sm: Size.XL, xl: Size.XXL },
    },
    [RoleName.USER_CHINESE]: {
      nameWord: {
        size: { base: Size.XXXXL, sm: Size.XXXXXL, xl: Size.XXXXXXL },
        font: theme.fonts.bodyCh,
      },
      transcriptionSize: { base: Size.XL, sm: Size.XXL, xl: Size.XXXL },
      nameTranslationSize: { base: Size.MD, sm: Size.XL, xl: Size.XL },
    },
  };

  const isNewStatus = reviewWord.status.toString() === Status[Status.NEW];

  const dynamicStyles = {
    transform: `${isFollowingSwipe
      ? isFlipped
        ? `rotateY(180deg) scaleX(-1) translateX(${deltaX}px) translateY(${deltaY}px)`
        : `rotateY(0deg) translateX(${deltaX}px) translateY(${deltaY}px)`
      : isFlipped
        ? `rotateY(180deg) scaleX(-1)`
        : `rotateY(0deg)`
    } ${isThrown
      ? `rotateY(90deg)`
      : ''
    }`,
    transition: `${isFollowingSwipe ? 'transform 0s' : 'transform 0.3s'}
     ${isThrown ? 'transform 0.6s' : ''}`,
  };

  return (
    <SwipeableContainer {...swipeHandlers} style={dynamicStyles}>
      <WordCard
        cardHeight={cardHeight}
        cardWidth={cardWidth}
        word={reviewWord}
        wordDataSize={wordDataSize}
        borderColor={isNewStatus && theme.colors[colorMode].reviewWordCardBadgeRedColor}
        bgColor={theme.colors[colorMode].reviewWordCardBgColor}
        isFlipped={isFlipped}
        setFlipped={setFlipped}
        setUnlocked={setUnlocked}
        infoGap='60px'
      />
    </SwipeableContainer>
  );
}

const SwipeableContainer = styled.div`
  z-index: 1;
`;

const ReviewWordPlaceholderContainer = styled.div<{
  $height: string | { base: string, sm: string, xl: string };
}>`
  height: ${({ $height }) => (typeof $height === 'string' ? $height : useBreakpointValue($height))};
`;
