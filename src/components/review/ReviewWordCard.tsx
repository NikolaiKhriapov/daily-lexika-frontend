import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import styled from 'styled-components';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import { useBreakpointValue, useColorMode, useDisclosure } from '@chakra-ui/react';
import { useGetUserInfoQuery } from '@store/api/userAPI';
import { ButtonType, RoleName, Size } from '@utils/constants';
import { theme } from '@utils/theme';
import { Status, WordDTO } from '@utils/types';
import Button from '@components/common/basic/Button';
import Text from '@components/common/basic/Text';
import Card from '@components/common/complex/Card';
import WordDetailedInfo from '@components/statistics/WordDetailedInfo';

type Props = {
  reviewWord?: WordDTO | null;
  isFlipped: boolean;
  setFlipped: any;
  isThrown: boolean;
  pressButton: any;
  isLoading: boolean;
};

export default function ReviewWordCard(props: Props) {
  const { reviewWord = null, isFlipped, setFlipped, isThrown, pressButton, isLoading } = props;

  const { colorMode } = useColorMode();
  const { isOpen: isOpenDetails, onOpen: onOpenDetails, onClose: onCloseDetails } = useDisclosure();
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

  const userRole = user.role!;
  const wordData = {
    [RoleName.USER_ENGLISH]: {
      transcription: {
        text: reviewWord.wordDataDTO.transcription,
        size: { base: Size.SM, sm: Size.XL, xl: Size.XL },
      },
      nameWord: {
        text: reviewWord.wordDataDTO.nameEnglish,
        size: { base: Size.XXL, sm: Size.XXXXL, xl: Size.XXXXL },
        font: theme.fonts.body,
      },
      nameTranslation: {
        text: reviewWord.wordDataDTO.nameRussian,
        size: { base: Size.LG, sm: Size.XXL, xl: Size.XXL },
      },
    },
    [RoleName.USER_CHINESE]: {
      transcription: {
        text: reviewWord.wordDataDTO.transcription,
        size: { base: Size.XL, sm: Size.XXL, xl: Size.XXXL },
      },
      nameWord: {
        text: reviewWord.wordDataDTO.nameChineseSimplified,
        size: { base: Size.XXXXL, sm: Size.XXXXXL, xl: Size.XXXXXXL },
        font: theme.fonts.bodyCh,
      },
      nameTranslation: {
        text: reviewWord.wordDataDTO.nameEnglish,
        size: { base: Size.MD, sm: Size.XL, xl: Size.XL },
      },
    },
    [RoleName.ADMIN]: null,
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

  const onClickDetails = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onOpenDetails();
  };

  return (
    <SwipeableContainer {...swipeHandlers} style={dynamicStyles}>
      <Card
        height={cardHeight}
        width={cardWidth}
        padding="10px"
        borderColor={isNewStatus && theme.colors[colorMode].reviewWordCardBadgeRedColor}
        bgColor={theme.colors[colorMode].reviewWordCardBgColor}
        isFlipped={isFlipped}
        setFlipped={setFlipped}
        face={(
          <ContentsContainer>
            <Text fontFamily={wordData[userRole]?.nameWord.font} size={wordData[userRole]?.nameWord.size}>
              {wordData[userRole]?.nameWord.text}
            </Text>
          </ContentsContainer>
        )}
        back={(
          <>
            <DetailsButtonContainer>
              <Button
                size={{ base: Size.SM, md: Size.MD }}
                buttonType={ButtonType.BUTTON}
                buttonText={<InfoOutlineIcon />}
                onClick={onClickDetails}
                isOpen={isOpenDetails}
                modalContent={(
                  <WordDetailedInfo
                    isOpen={isOpenDetails}
                    onClose={onCloseDetails}
                    word={reviewWord}
                  />
                )}
              />
            </DetailsButtonContainer>
            <ContentsContainer>
              <Text size={wordData[userRole]?.transcription.size}>{wordData[userRole]?.transcription.text}</Text>
              <Text size={wordData[userRole]?.nameTranslation.size}>{wordData[userRole]?.nameTranslation.text}</Text>
            </ContentsContainer>
          </>
        )}
      />
    </SwipeableContainer>
  );
}

const SwipeableContainer = styled.div`
`;

const DetailsButtonContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const ContentsContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 60px;
  text-align: center;
  justify-content: center;
`;

const ReviewWordPlaceholderContainer = styled.div<{
  $height: string | { base: string, sm: string, xl: string };
}>`
  height: ${({ $height }) => (typeof $height === 'string' ? $height : useBreakpointValue($height))};
`;
