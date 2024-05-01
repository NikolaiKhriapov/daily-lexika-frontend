import React from 'react';
import styled from 'styled-components';
import { useBreakpointValue, useDisclosure } from '@chakra-ui/react';
import { useGetUserInfoQuery } from '@store/api/userAPI';
import { EmailLinks } from '@utils/app/constants';
import { FontWeight } from '@utils/constants';
import { WordDto } from '@utils/types';
import WordDetailedInfo from '@components/app/content/statistics/WordDetailedInfo';
import ButtonWithIcon, { ButtonWithIconType } from '@components/ui-common/basic/ButtonWithIcon';
import Link from '@components/ui-common/basic/Link';
import Text from '@components/ui-common/basic/Text';
import ButtonsPronunciation from '@components/ui-common/complex/ButtonsPronunciation';
import Card from '@components/ui-common/complex/Card';
import WordDataHelper from '@helpers/WordDataHelper';

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
  title?: string;
};

export default function WordCard(props: Props) {
  const { cardHeight, cardWidth, word = null, wordDataSize, borderColor, bgColor, isFlipped, setFlipped, setUnlocked, title } = props;

  const { isOpen: isOpenDetails, onOpen: onOpenDetails, onClose: onCloseDetails } = useDisclosure();
  const { data: user } = useGetUserInfoQuery();

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
        <ContentsContainer>
          {title && <TextStyled fontWeight={FontWeight.SEMIBOLD} opacity={0.5}>{title}</TextStyled>}
          <ButtonsTopContainer>
            <ButtonWithIcon
              type={ButtonWithIconType.INFO}
              onClick={onClickDetails}
              isOpen={isOpenDetails}
              modalContent={(
                <WordDetailedInfo
                  isOpen={isOpenDetails}
                  onClose={onCloseDetails}
                  word={word}
                />
              )}
            />
          </ButtonsTopContainer>
          <ButtonsBottomContainer>
            <Link href={EmailLinks.ReportError(WordDataHelper.getWordNameByUserRole(word, user))}>
              <ButtonWithIcon type={ButtonWithIconType.ERROR} onClick={onClickError} />
            </Link>
          </ButtonsBottomContainer>
          <Text size={wordDataSize[user.role]?.transcriptionSize}>{word.wordDataDto.transcription}</Text>
          <Text size={wordDataSize[user.role]?.nameTranslationSize}>{WordDataHelper.getWordTranslation(word, user)}</Text>
        </ContentsContainer>
      )}
    />
  );
}

const ContentsContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 60px;
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
