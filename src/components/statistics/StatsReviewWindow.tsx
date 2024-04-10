import styled from 'styled-components';
import { ColorMode, useColorMode, useDisclosure } from '@chakra-ui/react';
import { useGetUserInfoQuery } from '@store/api/userAPI';
import { useGetAllWordPacksQuery } from '@store/api/wordPacksAPI';
import { Breakpoint, FontWeight, Size } from '@utils/constants';
import { borderStyles, getOriginalWordPackName, mediaBreakpointUp } from '@utils/functions';
import { theme } from '@utils/theme';
import { ReviewStatisticsDto } from '@utils/types';
import ArrowRightButton from '@components/common/basic/ArrowRightButton';
import ProgressBar from '@components/common/basic/ProgressBar';
import ProgressCircular from '@components/common/basic/ProgressCircular';
import Spinner from '@components/common/basic/Spinner';
import Text from '@components/common/basic/Text';
import Modal from '@components/common/complex/Modal';
import ReviewWordPackWindow from '@components/word-pack/ReviewWordPackWindow';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  reviewStatisticsDTO: ReviewStatisticsDto;
  wordsPercentage: { inReview: number, known: number };
  wordsTotal: number;
};

export default function StatsReviewWindow(props: Props) {
  const { isOpen, onClose, reviewStatisticsDTO, wordsPercentage, wordsTotal } = props;

  const { colorMode } = useColorMode();
  const { isOpen: isOpenDrawer, onOpen: onOpenDrawer, onClose: onCloseDrawer } = useDisclosure();

  const { data: user } = useGetUserInfoQuery();
  const { data: allWordPacks = [] } = useGetAllWordPacksQuery();
  const wordPack = allWordPacks.find((item) => item.name === reviewStatisticsDTO.wordPackName);

  if (!user) return <Spinner />;

  return (
    <Modal
      size={Size.XL}
      width='320px'
      isOpen={isOpen}
      onClose={onClose}
      header={getOriginalWordPackName(reviewStatisticsDTO.wordPackName, user)}
      body={(
        <>
          <PackProgress $colorMode={colorMode}>
            <WordPackNameAndInfoButton>
              <Text size={Size.XL} fontWeight={FontWeight.SEMIBOLD}>Pack Progress</Text>
              <ArrowRightButton onClick={onOpenDrawer} />
              {isOpenDrawer && wordPack && (
                <ReviewWordPackWindow
                  isOpen={isOpenDrawer}
                  onClose={onCloseDrawer}
                  wordPack={wordPack}
                />
              )}
            </WordPackNameAndInfoButton>
            <StatsRow>
              <Percentage>
                <Text size={{ base: Size.MD, md: Size.XL, xl: Size.XL }} fontWeight={FontWeight.SEMIBOLD}>
                  {`${wordsPercentage.known}%`}
                </Text>
                <Text size={{ base: Size.XS, md: Size.SM, xl: Size.SM }} fontWeight={FontWeight.SEMIBOLD}>
                  {' known'}
                </Text>
              </Percentage>
              <Text size={{ base: Size.SM, md: Size.MD, xl: Size.MD }} fontWeight={FontWeight.SEMIBOLD}>
                {`${reviewStatisticsDTO.wordsKnown}/${wordsTotal}`}
              </Text>
            </StatsRow>
            <ProgressBar value={wordsPercentage.known} />
          </PackProgress>
          <ReviewStatus $colorMode={colorMode}>
            <Text size={Size.XL} fontWeight={FontWeight.SEMIBOLD}>Review Status</Text>
            <StatsContainer>
              <ProgressCircular value={wordsPercentage.inReview + wordsPercentage.known} text='In Review' isWithLabel />
              <StatsColumn>
                <Stat>
                  <Text size={{ base: Size.XL, md: Size.XXXL, xl: Size.XXXL }}>
                    {reviewStatisticsDTO.wordsInReview + reviewStatisticsDTO.wordsKnown}
                  </Text>
                  <Text size={{ base: Size.XS, md: Size.MD, xl: Size.MD }} fontWeight={FontWeight.SEMIBOLD}>
                    Words In Review
                  </Text>
                </Stat>
                <Stat>
                  <Text size={{ base: Size.XL, md: Size.XXXL, xl: Size.XXXL }}>
                    {reviewStatisticsDTO.wordsNew}
                  </Text>
                  <Text size={{ base: Size.XS, md: Size.MD, xl: Size.MD }} fontWeight={FontWeight.SEMIBOLD}>
                    Unseen Words
                  </Text>
                </Stat>
              </StatsColumn>
            </StatsContainer>
          </ReviewStatus>
        </>
      )}
    />
  );
}

const PackProgress = styled.div<{ $colorMode: ColorMode }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px 15px 15px;
  border: ${({ $colorMode }) => borderStyles($colorMode)};
  border-radius: ${theme.stylesToDelete.borderRadius};
`;

const WordPackNameAndInfoButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const StatsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const Percentage = styled.div`
  display: flex;
  justify-content: center;
  align-items: baseline;
  gap: 4px;
`;

const ReviewStatus = styled.div<{ $colorMode: ColorMode }>`
  display: flex;
  flex-direction: column;
  padding: 10px 15px 15px;
  border: ${({ $colorMode }) => borderStyles($colorMode)};
  border-radius: ${theme.stylesToDelete.borderRadius};
`;

const StatsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;
`;

const StatsColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  
  ${mediaBreakpointUp(Breakpoint.TABLET)} {
    gap: 10px;
  }
`;

const Stat = styled.div`
  display: flex;
  flex-direction: column;
`;
