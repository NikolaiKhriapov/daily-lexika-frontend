import React from 'react';
import styled from 'styled-components';
import { useBreakpointValue, useDisclosure } from '@chakra-ui/react';
import SpeechRecognitionComponent from '@daily-lexika/components/app/content/review/SpeechRecognitionComponent';
import WordDetailedInfoDrawer from '@daily-lexika/components/app/content/words/WordDetailedInfoDrawer';
import { ButtonsPronunciation } from '@daily-lexika/components/ui/ButtonsPronunciation';
import WordDataHelper from '@daily-lexika/helpers/WordDataHelper';
import { useGetUserQuery } from '@daily-lexika/store/api/userAPI';
import { EmailLinks } from '@daily-lexika/utils/constants';
import { RoleName, WordDto } from '@library/daily-lexika';
import { ButtonWithIcon, ButtonWithIconType, Card,Link, Text } from '@library/shared/ui';
import { FontWeight } from '@library/shared/utils';

type Props = {
  cardHeight: string | { base: string, sm: string, xl: string }
  cardWidth: string | { base: string, sm: string, xl: string }
  word?: WordDto | null;
  wordDataSize: any;
  borderColor: string;
  bgColor: string;
  isFlipped: boolean;
  setFlipped: React.Dispatch<React.SetStateAction<boolean>>;
  setUnlocked: React.Dispatch<React.SetStateAction<boolean>>;
  infoGap: string;
  title?: string;
  withSpeechRecognition?: boolean;
};

export default function WordCard(props: Props) {
  const { cardHeight, cardWidth, word = null, wordDataSize, borderColor, bgColor, isFlipped, setFlipped, setUnlocked, title, infoGap, withSpeechRecognition = true } = props;

  const { data: user } = useGetUserQuery();
  const { isOpen: isOpenDetails, onOpen: onOpenDetails, onClose: onCloseDetails } = useDisclosure();

  if (!user || !user.role || !word) return <ReviewWordPlaceholderContainer $height={cardHeight} />;

  const onClickDetails = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onOpenDetails();
  };
  const onClickError = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
  };

  return (
    <Card
      height={cardHeight}
      width={cardWidth}
      padding="10px"
      borderColor={borderColor}
      bgColor={bgColor}
      isFlipped={isFlipped}
      setFlipped={setFlipped}
      setUnlocked={setUnlocked}
      face={(
        <ContentsContainer>
          {title && <TextStyled fontWeight={FontWeight.SEMIBOLD} opacity={0.5}>{title}</TextStyled>}
          <ButtonsTopContainer>
            <ButtonsPronunciation word={word} />
          </ButtonsTopContainer>
          <Text fontFamily={wordDataSize[user.role]?.nameWord.font} size={wordDataSize[user.role]?.nameWord.size}>
            {WordDataHelper.getWordNameByUserRole(word, user)}
          </Text>
        </ContentsContainer>
      )}
      back={(
        <ContentsContainer $gap={infoGap}>
          {title && <TextStyled fontWeight={FontWeight.SEMIBOLD} opacity={0.5}>{title}</TextStyled>}
          <ButtonsTopContainer>
            <ButtonWithIcon
              type={ButtonWithIconType.INFO}
              onClick={onClickDetails}
              isOpen={isOpenDetails}
              modalContent={(
                <WordDetailedInfoDrawer
                  isOpen={isOpenDetails}
                  onClose={onCloseDetails}
                  wordData={word.wordDataDto}
                  word={word}
                />
              )}
            />
            {withSpeechRecognition && user.role === RoleName.USER_ENGLISH && (
              <SpeechRecognitionComponent word={WordDataHelper.getWordNameByUserRole(word, user)} />
            )}
          </ButtonsTopContainer>
          <ButtonsBottomContainer>
            <Link href={EmailLinks.ReportError(WordDataHelper.getWordNameByUserRole(word, user))}>
              <ButtonWithIcon type={ButtonWithIconType.ERROR} onClick={onClickError} />
            </Link>
          </ButtonsBottomContainer>
          <TranscriptionContainer>
            {WordDataHelper.splitTranscriptions(word.wordDataDto.transcription).map((transcription, index) => (
              <Text key={index} size={wordDataSize[user.role!]?.transcriptionSize}>{transcription}</Text>
            ))}
          </TranscriptionContainer>
          <Text size={wordDataSize[user.role]?.nameTranslationSize}>{WordDataHelper.getWordTranslation(word, user)}</Text>
        </ContentsContainer>
      )}
    />
  );
}

const ContentsContainer = styled.div<{ $gap?: string }>`
  width: 83%;
  display: flex;
  flex-direction: column;
  gap: ${({ $gap }) => $gap && $gap};
  text-align: center;
  justify-content: center;
`;

const TextStyled = styled(Text)`
  position: absolute;
  top: 15px;
  left: 15px;
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

const ReviewWordPlaceholderContainer = styled.div<{
  $height: string | { base: string, sm: string, xl: string };
}>`
  height: ${({ $height }) => (typeof $height === 'string' ? $height : useBreakpointValue($height))};
`;

const TranscriptionContainer = styled.div`
`;
