import React, { useState } from 'react';
import { IoMdMic } from 'react-icons/io';
import styled from 'styled-components';
import { Modal } from '@chakra-ui/modal';
import { ColorMode, ModalBody, ModalContent, ModalOverlay, useColorMode, useDisclosure } from '@chakra-ui/react';
import { useGetUserInfoQuery } from '@store/api/userAPI';
import { RoleName } from '@utils/app/constants';
import { Size } from '@utils/constants';
import { theme } from '@utils/theme';
import ButtonWithIcon, { ButtonWithIconType } from '@components/ui-common/basic/ButtonWithIcon';
import Text from '@components/ui-common/basic/Text';
import WordDataHelper from '@helpers/WordDataHelper';

interface Props {
  word: string;
}

export default function SpeechRecognitionComponent(props: Props) {
  const { word } = props;

  const { colorMode } = useColorMode();
  const { data: user } = useGetUserInfoQuery();
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (!user || !user.role) return <></>;

  const startRecognition = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onOpen();

    const recognition = new ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition || (window as any).mozSpeechRecognition || (window as any).msSpeechRecognition)();

    let lang;
    switch (user.role) {
      case RoleName.USER_ENGLISH:
        lang = 'en-US';
        break;
      case RoleName.USER_CHINESE: {
        lang = 'zh-CN';
        break;
      }
      default: lang = 'en-US';
    }
    recognition.lang = lang;

    recognition.onstart = () => setListening(true);
    recognition.onresult = (onResultEvent: any) => setTranscript(onResultEvent.results[0][0].transcript);
    recognition.onend = () => setListening(false);

    recognition.start();
  };

  const isMatch = (wordOne: string, wordTwo: string) =>
    WordDataHelper.removeAccent(wordOne).toLowerCase() === WordDataHelper.removeAccent(wordTwo).toLowerCase();

  return (
    <>
      {
        isMatch(transcript, '')
          ? <ButtonWithIcon type={ButtonWithIconType.MICROPHONE} onClick={startRecognition} />
          : isMatch(transcript, word)
            ? <ButtonWithIcon type={ButtonWithIconType.MICROPHONE_GREEN} onClick={startRecognition} />
            : <ButtonWithIcon type={ButtonWithIconType.MICROPHONE_RED} onClick={startRecognition} />
      }
      {listening && (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContentStyled $colorMode={colorMode}>
            <ModalBodyStyled>
              <IoMdMic size={60} />
              <TextContainer>
                <Text size={Size.LG}>Listening&nbsp;</Text>
                <LoadingDots $colorMode={colorMode} />
              </TextContainer>
            </ModalBodyStyled>
          </ModalContentStyled>
        </Modal>
      )}
    </>
  );
}

const ModalContentStyled = styled(ModalContent)<{ $colorMode: ColorMode; }>`
  height: 250px !important;
  width: 250px !important;
  border-radius: 100% !important;
  background: ${({ $colorMode }) => ($colorMode === 'light' ? 'rgba(230, 230, 230, 0.85)' : 'rgba(40, 40, 40, 0.85)')} !important;
  border: 5px solid ${theme.colors.dark.borderColorMain};
`;

const ModalBodyStyled = styled(ModalBody)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const LoadingDots = styled.div<{ $colorMode: ColorMode }>`
  &::after {
    content: ' .';
    animation: dots 1s steps(5, end) infinite;
  }

  @keyframes dots {
    0%, 20% {
      color: transparent;
      text-shadow: .25em 0 0 transparent, .25em 0 0 transparent;
    }
    40% {
      color: ${({ $colorMode }) => ($colorMode === 'dark' ? 'white' : 'black')};
      text-shadow: .25em 0 0 transparent, .25em 0 0 transparent;
    }
    60% {
      text-shadow: ${({ $colorMode }) => ($colorMode === 'dark' ? '.25em 0 0 white, .25em 0 0 transparent' : '.25em 0 0 black, .25em 0 0 transparent')};
    }
    80%, 100% {
      text-shadow: ${({ $colorMode }) => ($colorMode === 'dark' ? '.25em 0 0 white, .25em 0 0 white' : '.25em 0 0 black, .25em 0 0 black')};
    }
  }
`;
