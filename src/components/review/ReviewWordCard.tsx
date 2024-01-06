import { ColorMode, useColorMode } from '@chakra-ui/react';
import styled, { css } from 'styled-components/macro';
import React from 'react';
import { Status, WordDTO } from '../../utils/types';
import { Breakpoint, RoleName, Size } from '../../utils/constants';
import Text from '../common/basic/Text';
import StatusBadge from '../common/basic/StatusBadge';
import { theme } from '../../utils/theme';
import { borderStyles, mediaBreakpointUp } from '../../utils/functions';
import { useAuth } from '../context/AuthContext';

type Props = {
  reviewWordDTO: WordDTO;
  isFlipped: boolean;
  setFlipped: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ReviewWordCard(props: Props) {
  const { reviewWordDTO, isFlipped, setFlipped } = props;

  const { user } = useAuth();
  const { colorMode } = useColorMode();
  const handleFlip = () => setFlipped(!isFlipped);
  const isNewStatus = reviewWordDTO.status.toString() === Status[Status.NEW];

  const wordDataCh = {
    pinyin: {
      text: reviewWordDTO.pinyin,
      size: { base: Size.XXL, md: Size.XXXL, xl: Size.XXXL },
    },
    nameChineseSimplified: {
      text: reviewWordDTO.nameChineseSimplified,
      size: { base: Size.XXXXL, md: Size.XXXXXXL, xl: Size.XXXXXXL },
    },
    nameEnglish: {
      text: reviewWordDTO.nameEnglish,
      size: { base: Size.MD, md: Size.XL, xl: Size.XL },
    },
  };

  const wordDataEn = {
    nameEnglish: {
      text: reviewWordDTO.nameEnglish,
      size: { base: Size.XXL, md: Size.XXXXL, xl: Size.XXXXL },
    },
    nameRussian: {
      text: reviewWordDTO.nameRussian,
      size: { base: Size.LG, md: Size.XXL, xl: Size.XXL },
    },
  };

  return (
    <Container
      $colorMode={colorMode}
      $isNewStatus={isNewStatus}
      $isFlipped={isFlipped}
      onClick={handleFlip}
    >
      {isNewStatus && <StatusBadge text={reviewWordDTO.status} colorScheme="red" isInTopRight />}
      {user?.role === RoleName.USER_CHINESE && (
        <ContentsContainer>
          <Text size={isFlipped ? wordDataCh.pinyin.size : wordDataCh.nameChineseSimplified.size}>
            {isFlipped ? wordDataCh.pinyin.text : wordDataCh.nameChineseSimplified.text}
          </Text>
          {isFlipped && (
            <Text size={wordDataCh.nameEnglish.size}>
              {wordDataCh.nameEnglish.text}
            </Text>
          )}
        </ContentsContainer>
      )}
      {user?.role === RoleName.USER_ENGLISH && (
        <ContentsContainer>
          <Text size={isFlipped ? wordDataEn.nameRussian.size : wordDataEn.nameEnglish.size}>
            {isFlipped ? wordDataEn.nameRussian.text : wordDataEn.nameEnglish.text}
          </Text>
        </ContentsContainer>
      )}
    </Container>
  );
}

const Container = styled.div<{
  $colorMode: ColorMode;
  $isNewStatus: boolean;
  $isFlipped: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 240px;
  height: calc(240px * 1.3);
  padding: 10px;

  background-color: ${({ $colorMode }) => theme.colors[$colorMode].reviewWordCardBgColor};
  border: ${({ $colorMode }) => borderStyles($colorMode)};
  border-radius: ${theme.stylesToDelete.borderRadius};
  border-color: ${({ $colorMode, $isNewStatus }) => ($isNewStatus
          && theme.colors[$colorMode].reviewWordCardBadgeRedColor
  )};

  transition: transform 0.3s;
  transform: ${({ $isFlipped }) => ($isFlipped
    ? css`rotateY(180deg) scaleX(-1);`
    : css`rotateY(0deg)`
  )};

  ${mediaBreakpointUp('400px')} {
    height: 370px;
    width: calc(375px / 1.3);
  }

  ${mediaBreakpointUp(Breakpoint.TABLET)} {
    width: 400px;
    height: calc(400px * 1.3);
  }
`;

const ContentsContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 60px;
  text-align: center;
  justify-content: center;
`;
