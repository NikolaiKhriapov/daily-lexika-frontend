import React, { useContext } from 'react';
import styled from 'styled-components';
import { Divider, Tab, TabList, TabPanel, TabPanels, Tabs, useBreakpointValue } from '@chakra-ui/react';
import { AuthContext } from '@context/AuthContext';
import { Breakpoint, FontWeight, RoleName, Size } from '@utils/constants';
import { hiddenScrollbar, mediaBreakpointUp } from '@utils/functions';
import { WordDTO } from '@utils/types';
import ProgressBar from '@components/common/basic/ProgressBar';
import Text from '@components/common/basic/Text';
import BadgeOrStreakCount from '@components/common/complex/BadgeOrStreakCount';
import Modal from '@components/common/complex/Modal';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  wordDTO: WordDTO;
};

export default function WordDetailedInfo(props: Props) {
  const { isOpen, onClose, wordDTO } = props;

  const { user } = useContext(AuthContext);
  const streakProgress = (wordDTO.totalStreak / 5) * 100;

  const getWordInfoForUserRole = () => {
    const map: Record<RoleName, any> = {
      [RoleName.USER_ENGLISH]: {
        name: wordDTO.wordDataDTO.nameEnglish,
        transcription: wordDTO.wordDataDTO.transcription,
        translation: wordDTO.wordDataDTO.nameRussian,
      },
      [RoleName.USER_CHINESE]: {
        name: wordDTO.wordDataDTO.nameChineseSimplified,
        transcription: wordDTO.wordDataDTO.transcription,
        translation: wordDTO.wordDataDTO.nameEnglish,
      },
      [RoleName.ADMIN]: null,
    };
    return map[user!.role!];
  };

  return (
    <Modal
      width={useBreakpointValue({ base: '80vw', md: '575px' })}
      height={useBreakpointValue({ base: '85vh', md: '600px' })}
      isOpen={isOpen}
      onClose={onClose}
      header={getWordInfoForUserRole().name}
      body={(
        <Container>
          <Tabs isFitted variant='enclosed' colorScheme='gray'>
            <TabList mb='10px'>
              <Tab>General</Tab>
              <Tab>Examples</Tab>
            </TabList>
            <TabPanelsStyled>
              <TabPanel>
                <General>
                  <TranscriptionAndTranslationContainer>
                    <Text>{getWordInfoForUserRole().transcription}</Text>
                    <Text>{getWordInfoForUserRole().translation}</Text>
                  </TranscriptionAndTranslationContainer>
                  <ProgressBarContainerTablet>
                    <TopContainer>
                      <Text fontSize={Size.MD} fontWeight={FontWeight.SEMIBOLD} color='green.200'>{`${wordDTO.totalStreak} / 5`}</Text>
                      <BadgeOrStreakCount wordDTO={wordDTO} />
                    </TopContainer>
                    <ProgressBar value={streakProgress} colorScheme='green' />
                  </ProgressBarContainerTablet>
                </General>
                <ProgressBarContainerMobile>
                  <Divider marginY={3} />
                  <TopContainer>
                    <Text fontWeight={FontWeight.SEMIBOLD} color='green.200'>{`${wordDTO.totalStreak} / 5`}</Text>
                    <BadgeOrStreakCount wordDTO={wordDTO} />
                  </TopContainer>
                  <ProgressBar value={(wordDTO.totalStreak / 5) * 100} colorScheme='green' />
                </ProgressBarContainerMobile>
                <Divider marginY={3} />
                {wordDTO.wordDataDTO.definition !== '[TODO]' && (
                  <>
                    <Text>{wordDTO.wordDataDTO.definition}</Text>
                    <Divider marginY={3} />
                  </>
                )}
              </TabPanel>
              <TabPanel>
                {wordDTO.wordDataDTO.examples.map((example, index) => (
                  example !== '[TODO]' && (
                    <>
                      <Text key={index}>{example}</Text>
                      <Divider marginY={3} />
                    </>
                  )))}
              </TabPanel>
            </TabPanelsStyled>
          </Tabs>
        </Container>
      )}
    />
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: hidden;
  
  ${mediaBreakpointUp(Breakpoint.TABLET)} {
    margin: 0 0 50px 0;
  }
`;

const ProgressBarContainerMobile = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  ${mediaBreakpointUp(Breakpoint.TABLET)} {
    display: none;
  }
`;

const ProgressBarContainerTablet = styled.div`
  display: none;
  
  ${mediaBreakpointUp(Breakpoint.TABLET)} {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 150px;
  }
`;

const TranscriptionAndTranslationContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  height: 30px;
`;

const TabPanelsStyled = styled(TabPanels)`
  max-height: 61vh;
  overflow-y: auto;
  height: fit-content;
  ${hiddenScrollbar};
`;

const General = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
