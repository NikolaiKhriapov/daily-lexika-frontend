import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useColorMode } from '@chakra-ui/react';
import WordCard from '@daily-lexika/components/app/content/review/WordCard';
import { useGetUserQuery } from '@daily-lexika/store/api/userAPI';
import { useGetWordOfTheDayQuery } from '@daily-lexika/store/api/wordsAPI';
import { RoleName } from '@library/daily-lexika';
import { Breakpoint, mediaBreakpointUp, Size, theme } from '@library/shared/utils';

export default function WordOfTheDayComponent() {
  const { colorMode } = useColorMode();
  const { t } = useTranslation();
  const { data: user } = useGetUserQuery();
  const { data: wordOfTheDay } = useGetWordOfTheDayQuery();
  const [isFlipped, setFlipped] = useState(false);

  const cardHeight = { base: '280px', xl: '300px' };
  const cardWidth = { base: '215px', xl: 'auto' };

  if (!user || !wordOfTheDay) return <></>;

  const wordDataSize = {
    [RoleName.USER_ENGLISH]: {
      nameWord: {
        size: { base: Size.LG, sm: Size.LG, xl: Size.XL },
        font: theme.fonts.body,
      },
      transcriptionSize: { base: Size.SM, sm: Size.SM, xl: Size.MD },
      nameTranslationSize: { base: Size.MD, sm: Size.MD, xl: Size.LG },
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
          title={t('WordOfTheDayComponent.title')}
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
          title={t('WordOfTheDayComponent.title')}
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
