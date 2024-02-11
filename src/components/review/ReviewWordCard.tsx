import React, { useContext, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import styled from 'styled-components';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import { useColorMode, useDisclosure } from '@chakra-ui/react';
import { AuthContext } from '@context/AuthContext';
import { ButtonType, RoleName, Size } from '@utils/constants';
import { theme } from '@utils/theme';
import { Status, WordDTO } from '@utils/types';
import Button from '@components/common/basic/Button';
import Text from '@components/common/basic/Text';
import Card from '@components/common/complex/Card';
import WordDetailedInfo from '@components/statistics/WordDetailedInfo';

type Props = {
  reviewWordDTO: WordDTO;
  isFlipped: boolean;
  setFlipped: any;
  isThrown: boolean;
  pressButton: any;
  isLoading: boolean;
};

export default function ReviewWordCard(props: Props) {
  const { reviewWordDTO, isFlipped, setFlipped, isThrown, pressButton, isLoading } = props;

  const { user } = useContext(AuthContext);
  const { colorMode } = useColorMode();
  const { isOpen: isOpenDetails, onOpen: onOpenDetails, onClose: onCloseDetails } = useDisclosure();
  const [deltaX, setDeltaX] = useState(0);
  const [deltaY, setDeltaY] = useState(0);
  const [isFollowingSwipe, setFollowingSwipe] = useState(false);

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

  const userRole = user!.role!;
  const wordData = {
    [RoleName.USER_ENGLISH]: {
      transcription: {
        text: reviewWordDTO.wordDataDTO.transcription,
        size: { base: Size.SM, sm: Size.XL, xl: Size.XL },
      },
      nameWord: {
        text: reviewWordDTO.wordDataDTO.nameEnglish,
        size: { base: Size.XXL, sm: Size.XXXXL, xl: Size.XXXXL },
        font: theme.fonts.body,
      },
      nameTranslation: {
        text: reviewWordDTO.wordDataDTO.nameRussian,
        size: { base: Size.LG, sm: Size.XXL, xl: Size.XXL },
      },
    },
    [RoleName.USER_CHINESE]: {
      transcription: {
        text: reviewWordDTO.wordDataDTO.transcription,
        size: { base: Size.XL, sm: Size.XXL, xl: Size.XXXL },
      },
      nameWord: {
        text: reviewWordDTO.wordDataDTO.nameChineseSimplified,
        size: { base: Size.XXXXL, sm: Size.XXXXXL, xl: Size.XXXXXXL },
        font: theme.fonts.bodyCh,
      },
      nameTranslation: {
        text: reviewWordDTO.wordDataDTO.nameEnglish,
        size: { base: Size.MD, sm: Size.XL, xl: Size.XL },
      },
    },
    [RoleName.ADMIN]: null,
  };

  const isNewStatus = reviewWordDTO.status.toString() === Status[Status.NEW];

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
        height={{ base: '312px', sm: '390px', xl: '520px' }}
        width={{ base: '240px', sm: '300px', xl: '400px' }}
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
                    wordDTO={reviewWordDTO}
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
