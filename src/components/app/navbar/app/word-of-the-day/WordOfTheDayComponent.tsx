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

  const cardHeight = { base: '280px', xl: '300px' };
  const cardWidth = { base: '215px', xl: 'auto' };

  if (!user || !wordOfTheDay) return <></>;

  const wordDataSize = {
    [RoleName.USER_ENGLISH]: {
      nameWord: {
        size: { base: Size.XL, sm: Size.XL, xl: Size.XXL },
        font: theme.fonts.body,
      },
      transcriptionSize: { base: Size.MD, sm: Size.MD, xl: Size.LG },
      nameTranslationSize: { base: Size.MD, sm: Size.MD, xl: Size.MD },
    },
    [RoleName.USER_CHINESE]: {
      nameWord: {
        size: { base: Size.XXXL, sm: Size.XXXL, xl: Size.XXXXL },
        font: theme.fonts.bodyCh,
      },
      transcriptionSize: { base: Size.MD, sm: Size.MD, xl: Size.LG },
      nameTranslationSize: { base: Size.SM, sm: Size.SM, xl: Size.MD },
    },
  };

  return (
    <>
      <ContainerMobileAndTablet>
        <WordCard
          cardHeight={cardHeight.base}
          cardWidth={cardWidth.base}
          word={wordOfTheDay}
          wordDataSize={wordDataSize}
          borderColor={theme.colors[colorMode].borderColor}
          bgColor={theme.colors[colorMode].bgColor}
          isFlipped={isFlipped}
          setFlipped={() => setFlipped(!isFlipped)}
          setUnlocked={() => null}
          title="Word of the Day"
          withSpeechRecognition={false}
          infoGap='20px'
        />
      </ContainerMobileAndTablet>
      <ContainerDesktop>
        <WordCard
          cardHeight={cardHeight.xl}
          cardWidth={cardWidth.xl}
          word={wordOfTheDay}
          wordDataSize={wordDataSize}
          borderColor={theme.colors[colorMode].borderColorMain}
          bgColor={theme.colors[colorMode].background2}
          isFlipped={isFlipped}
          setFlipped={() => setFlipped(!isFlipped)}
          setUnlocked={() => null}
          title="Word of the Day"
          withSpeechRecognition={false}
          infoGap='25px'
        />
      </ContainerDesktop>
    </>
  );
}

const ContainerDesktop = styled.div`
  display: none;

  ${mediaBreakpointUp(Breakpoint.DESKTOP)} {
    display: block;
  }
`;

const ContainerMobileAndTablet = styled.div`
  ${mediaBreakpointUp(Breakpoint.DESKTOP)} {
      display: none;
  }
`;
