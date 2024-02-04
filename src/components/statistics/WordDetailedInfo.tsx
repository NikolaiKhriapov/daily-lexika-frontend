import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Divider, Tab, TabList, TabPanel, TabPanels, Tabs, useBreakpointValue } from '@chakra-ui/react';
import { getWord } from '@services/words';
import { Breakpoint } from '@utils/constants';
import { hiddenScrollbar, mediaBreakpointUp } from '@utils/functions';
import { WordDTO } from '@utils/types';
import Text from '@components/common/basic/Text';
import BadgeOrStreakCount from '@components/common/complex/BadgeOrStreakCount';
import Modal from '@components/common/complex/Modal';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  wordId: number;
};

export default function WordDetailedInfo(props: Props) {
  const { isOpen, onClose, wordId } = props;
  const [wordDTO, setWordDTO] = useState<WordDTO | null>(null);

  const fetchWordDTO = (id: number) => {
    getWord(id)
      .then((response) => setWordDTO(response.data))
      .catch((error) => console.error(error.code, error.response.data.message));
  };

  useEffect(() => {
    fetchWordDTO(wordId);
  }, [wordId]);

  return (
    <Modal
      width={useBreakpointValue({ base: '80vw', md: '575px' })}
      height={useBreakpointValue({ base: '85vh', md: '600px' })}
      isOpen={isOpen}
      onClose={onClose}
      header={wordDTO?.nameEnglish}
      body={(
        <Container>
          <Tabs isFitted variant='enclosed'>
            <TabList mb='10px'>
              <Tab>General</Tab>
              <Tab>Examples</Tab>
            </TabList>
            <TabPanelsStyled>
              <TabPanel>
                <GeneralAndBadgeContainer>
                  <Text>{wordDTO?.transcription}</Text>
                  {wordDTO && (<BadgeOrStreakCount wordDTO={wordDTO} />)}
                </GeneralAndBadgeContainer>
                <Text>{wordDTO?.nameRussian}</Text>
                <Divider marginY={3} />
                <Text>{wordDTO?.definition}</Text>
                <Divider marginY={3} />
              </TabPanel>
              <TabPanel>
                {wordDTO?.examples.map((examples, index) => (
                  <>
                    <Text key={index}>{examples}</Text>
                    <Divider marginY={3} />
                  </>
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

const TabPanelsStyled = styled(TabPanels)`
  max-height: 61vh;
  overflow-y: auto;
  height: fit-content;
  ${hiddenScrollbar};
`;

const GeneralAndBadgeContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
