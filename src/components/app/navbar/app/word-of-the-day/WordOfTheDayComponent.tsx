import React, { useState } from 'react';
import styled from 'styled-components';
import { useColorMode } from '@chakra-ui/react';
import { useGetUserInfoQuery } from '@store/api/userAPI';
import { useGetWordOfTheDayQuery } from '@store/api/wordsAPI';
import { RoleName } from '@utils/app/constants';
import { Breakpoint, Size } from '@utils/constants';
import { mediaBreakpointUp } from '@utils/functions';
import { theme } from '@utils/theme';
import WordCard from '@components/app/content/review/WordCard';

export default function WordOfTheDayComponent() {
  const { colorMode } = useColorMode();
  const [isFlipped, setFlipped] = useState(false);

  const { data: user } = useGetUserInfoQuery();
  const { data: wordOfTheDay } = useGetWordOfTheDayQuery();

  const cardHeight = '300px';
  const cardWidth = 'auto';

  if (!user || !wordOfTheDay) return <></>;

  const wordDataSize = {
    [RoleName.USER_ENGLISH]: {
      nameWord: {
        size: { base: Size.XXL, sm: Size.XXXXL, xl: Size.XXL },
        font: theme.fonts.body,
      },
      transcriptionSize: { base: Size.SM, sm: Size.XL, xl: Size.LG },
      nameTranslationSize: { base: Size.LG, sm: Size.XXL, xl: Size.MD },
    },
    [RoleName.USER_CHINESE]: {
      nameWord: {
        size: { base: Size.XXXXL, sm: Size.XXXXXL, xl: Size.XXXXL },
        font: theme.fonts.bodyCh,
      },
      transcriptionSize: { base: Size.XL, sm: Size.XXL, xl: Size.LG },
      nameTranslationSize: { base: Size.MD, sm: Size.XL, xl: Size.MD },
    },
    [RoleName.ADMIN]: null,
  };

  return (
    <ContainerDesktop>
      <WordCard
        cardHeight={cardHeight}
        cardWidth={cardWidth}
        word={wordOfTheDay}
        wordDataSize={wordDataSize}
        borderColor={theme.colors[colorMode].borderColorMain}
        bgColor={theme.colors[colorMode].background2}
        isFlipped={isFlipped}
        setFlipped={() => setFlipped(!isFlipped)}
        setUnlocked={() => null}
        title="Word of the Day"
      />
    </ContainerDesktop>
  );
}

const ContainerDesktop = styled.div`
  display: none !important;

  ${mediaBreakpointUp(Breakpoint.DESKTOP)} {
    display: block !important;
  }
`;
