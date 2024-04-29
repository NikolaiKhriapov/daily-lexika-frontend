import React from 'react';
import styled from 'styled-components';
import { Divider, Tab, TabList, TabPanel, TabPanels, Tabs, useBreakpointValue } from '@chakra-ui/react';
import { useGetUserInfoQuery } from '@store/api/userAPI';
import { RoleName } from '@utils/app/constants';
import { Breakpoint, FontWeight, Size } from '@utils/constants';
import { hiddenScrollbar, mediaBreakpointUp } from '@utils/functions';
import { Language, WordDto } from '@utils/types';
import ProgressBar from '@components/ui-common/basic/ProgressBar';
import Spinner from '@components/ui-common/basic/Spinner';
import Text from '@components/ui-common/basic/Text';
import BadgeOrStreakCount from '@components/ui-common/complex/BadgeOrStreakCount';
import ComingSoon from '@components/ui-common/complex/ComingSoon';
import Modal from '@components/ui-common/complex/Modal';
import WordDataHelper from '@helpers/WordDataHelper';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  word: WordDto;
};

export default function WordDetailedInfo(props: Props) {
  const { isOpen, onClose, word } = props;

  const { data: user } = useGetUserInfoQuery();

  const streakProgress = (word.totalStreak / 5) * 100;
  const modalWidth = useBreakpointValue({ base: '80vw', md: '575px' });
  const modalHeight = useBreakpointValue({ base: '550px', md: '600px' });
  
  if (!user) return <Spinner />;

  return (
    <Modal
      width={modalWidth}
      height={modalHeight}
      isOpen={isOpen}
      onClose={onClose}
      header={WordDataHelper.getWordNameByUserRole(word, user)}
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
                    <Text>{word.wordDataDto.transcription}</Text>
                    <Text>{WordDataHelper.getWordTranslation(word, user)}</Text>
                  </TranscriptionAndTranslationContainer>
                  <ProgressBarContainerTablet>
                    <TopContainer>
                      <Text fontSize={Size.MD} fontWeight={FontWeight.SEMIBOLD} color='green.200'>{`${word.totalStreak} / 5`}</Text>
                      <BadgeOrStreakCount word={word} />
                    </TopContainer>
                    <ProgressBar value={streakProgress} colorScheme='green' />
                  </ProgressBarContainerTablet>
                </General>
                <ProgressBarContainerMobile>
                  <Divider marginY={3} />
                  <TopContainer>
                    <Text fontWeight={FontWeight.SEMIBOLD} color='green.200'>{`${word.totalStreak} / 5`}</Text>
                    <BadgeOrStreakCount word={word} />
                  </TopContainer>
                  <ProgressBar value={(word.totalStreak / 5) * 100} colorScheme='green' />
                </ProgressBarContainerMobile>
                <Divider marginY={3} />
                {word.wordDataDto.definition !== '[TODO]' && (
                  <>
                    <Text>{word.wordDataDto.definition}</Text>
                    <Divider marginY={3} />
                  </>
                )}
              </TabPanel>
              <TabPanel>
                {user.role === RoleName.USER_ENGLISH && word.wordDataDto.examples.map((example, index) => (
                  <>
                    <Text key={index}>{example}</Text>
                    <Divider marginY={3} />
                  </>
                ))}
                {user.role === RoleName.USER_CHINESE && word.wordDataDto.examples.map((example, idx) => (
                  example === '[TODO]'
                    ? <ComingSoon key={idx} />
                    : (
                      <>
                        <Text key={idx} size={Size.XL} isCentered>{((idx + 1) % 5 === 1 && example)}</Text>{/* Chinese */}
                        <Text key={idx} size={Size.SM} isCentered>{((idx + 5) % 5 === 1 && example)}</Text>{/* Pinyin */}
                        {user.translationLanguage === Language.ENGLISH && <Text key={idx} isCentered>{((idx + 4) % 5 === 1 && example)}</Text>}
                        {user.translationLanguage === Language.RUSSIAN && <Text key={idx}>{((idx + 3) % 5 === 1 && example)}</Text>}
                        {(idx + 2) % 5 === 1 && <Divider marginY={3} />}
                      </>
                    )
                ))}
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
    justify-content: center;
    gap: 5px;
    min-width: 150px;
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
  height: fit-content;
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
  gap: 20px;
`;
