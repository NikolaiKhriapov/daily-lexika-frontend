import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import styled from 'styled-components';
import { useBreakpointValue, useColorMode, useDisclosure } from '@chakra-ui/react';
import { useGetUserInfoQuery } from '@store/api/userAPI';
import { EmailLinks, RoleName } from '@utils/app/constants';
import { Size } from '@utils/constants';
import { theme } from '@utils/theme';
import { Status, WordDto } from '@utils/types';
import WordDetailedInfo from '@components/app/content/statistics/WordDetailedInfo';
import ButtonWithIcon, { ButtonWithIconType } from '@components/ui-common/basic/ButtonWithIcon';
import Link from '@components/ui-common/basic/Link';
import Text from '@components/ui-common/basic/Text';
import ButtonsPronunciation from '@components/ui-common/complex/ButtonsPronunciation';
import Card from '@components/ui-common/complex/Card';
import WordDataHelper from '@helpers/WordDataHelper';

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

  const wordDataSize = {
    [RoleName.USER_ENGLISH]: {
      nameWord: {
        size: { base: Size.XXL, sm: Size.XXXXL, xl: Size.XXXXL },
        font: theme.fonts.body,
      },
      transcriptionSize: { base: Size.SM, sm: Size.XL, xl: Size.XL },
      nameTranslationSize: { base: Size.LG, sm: Size.XXL, xl: Size.XXL },
    },
    [RoleName.USER_CHINESE]: {
      nameWord: {
        size: { base: Size.XXXXL, sm: Size.XXXXXL, xl: Size.XXXXXXL },
        font: theme.fonts.bodyCh,
      },
      transcriptionSize: { base: Size.XL, sm: Size.XXL, xl: Size.XXXL },
      nameTranslationSize: { base: Size.MD, sm: Size.XL, xl: Size.XL },
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
  const onClickError = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
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
        setUnlocked={setUnlocked}
        face={(
          <ContentsContainer>
            <ButtonsTopContainer>
              <ButtonsPronunciation word={reviewWord} />
            </ButtonsTopContainer>
            <Text fontFamily={wordDataSize[userRole]?.nameWord.font} size={wordDataSize[userRole]?.nameWord.size}>
              {WordDataHelper.getWordNameByUserRole(reviewWord, user)}
            </Text>
          </ContentsContainer>
        )}
        back={(
          <ContentsContainer>
            <ButtonsTopContainer>
              <ButtonWithIcon
                type={ButtonWithIconType.INFO}
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
            </ButtonsTopContainer>
            <ButtonsBottomContainer>
              <Link href={EmailLinks.ReportError(WordDataHelper.getWordNameByUserRole(reviewWord, user))}>
                <ButtonWithIcon type={ButtonWithIconType.ERROR} onClick={onClickError} />
              </Link>
            </ButtonsBottomContainer>
            <Text size={wordDataSize[userRole]?.transcriptionSize}>{reviewWord.wordDataDto.transcription}</Text>
            <Text size={wordDataSize[userRole]?.nameTranslationSize}>{WordDataHelper.getWordTranslation(reviewWord, user!)}</Text>
          </ContentsContainer>
        )}
      />
    </SwipeableContainer>
  );
}

const SwipeableContainer = styled.div`
  z-index: 1;
`;

const ButtonsTopContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ButtonsBottomContainer = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
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
