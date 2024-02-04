import React, { useContext, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import styled from 'styled-components';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import { ColorMode, useBreakpointValue, useColorMode, useDisclosure } from '@chakra-ui/react';
import { AuthContext } from '@context/AuthContext';
import { Breakpoint, ButtonType, RoleName, Size } from '@utils/constants';
import { borderStyles, mediaBreakpointUp } from '@utils/functions';
import { theme } from '@utils/theme';
import { Status, WordDTO } from '@utils/types';
import Button from '@components/common/basic/Button';
import Text from '@components/common/basic/Text';
import WordDetailedInfo from '@components/statistics/WordDetailedInfo';

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

  const { user } = useContext(AuthContext);
  const { colorMode } = useColorMode();
  const { isOpen: isOpenDetails, onOpen: onOpenDetails, onClose: onCloseDetails } = useDisclosure();
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

  const userRole = user!.role!;
  const wordData = {
    [RoleName.USER_ENGLISH]: {
      transcription: {
        text: reviewWordDTO.transcription,
        size: { base: Size.SM, md: Size.XL, xl: Size.XL },
      },
      nameWord: {
        text: reviewWordDTO.nameEnglish,
        size: { base: Size.XXL, md: Size.XXXXL, xl: Size.XXXXL },
      },
      nameTranslation: {
        text: reviewWordDTO.nameRussian,
        size: { base: Size.LG, md: Size.XXL, xl: Size.XXL },
      },
    },
    [RoleName.USER_CHINESE]: {
      transcription: {
        text: reviewWordDTO.transcription,
        size: { base: Size.XL, md: Size.XXL, xl: Size.XXXL },
      },
      nameWord: {
        text: reviewWordDTO.nameChineseSimplified,
        size: { base: Size.XXXXXL, md: Size.XXXXXXL, xl: Size.XXXXXXL },
      },
      nameTranslation: {
        text: reviewWordDTO.nameEnglish,
        size: { base: Size.MD, md: Size.XL, xl: Size.XL },
      },
    },
    [RoleName.ADMIN]: null,
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

  const onClickDetails = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onOpenDetails();
  };

  return (
    <Container
      style={dynamicStyles}
      $colorMode={colorMode}
      $isNewStatus={isNewStatus}
      {...swipeHandlers}
      onClick={() => setFlipped(!isFlipped)}
    >
      {userRole === RoleName.USER_ENGLISH && (
        <DetailsButtonContainer>
          <Button
            size={{ base: Size.SM, md: Size.MD }}
            buttonType={ButtonType.BUTTON}
            buttonText={<InfoOutlineIcon />}
            onClick={onClickDetails}
          />
          {isOpenDetails && (
            <WordDetailedInfo
              isOpen={isOpenDetails}
              onClose={onCloseDetails}
              wordId={reviewWordDTO.id}
            />
          )}
        </DetailsButtonContainer>
      )}
      {!isFlipped && (
        <ContentsContainer>
          <Text size={wordData[userRole]?.nameWord.size}>{wordData[userRole]?.nameWord.text}</Text>
        </ContentsContainer>
      )}
      {isFlipped && (
        <ContentsContainer>
          <Text size={wordData[userRole]?.transcription.size}>{wordData[userRole]?.transcription.text}</Text>
          <Text size={wordData[userRole]?.nameTranslation.size}>{wordData[userRole]?.nameTranslation.text}</Text>
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
