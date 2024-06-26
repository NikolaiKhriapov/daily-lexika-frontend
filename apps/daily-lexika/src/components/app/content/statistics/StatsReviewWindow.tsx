import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { ColorMode, useColorMode, useDisclosure } from '@chakra-ui/react';
import ReviewWordPackWindow from '@daily-lexika/components/app/content/word-pack/ReviewWordPackWindow';
import I18nHelper from '@daily-lexika/helpers/I18nHelper';
import { useGetUserQuery } from '@daily-lexika/store/api/userAPI';
import { useGetAllWordPacksQuery } from '@daily-lexika/store/api/wordPacksAPI';
import { ReviewStatisticsDto } from '@library/daily-lexika';
import { ArrowRightButton, Modal,ProgressBar, ProgressCircular, Spinner, Text } from '@library/shared/ui';
import { borderStyles, Breakpoint, FontWeight, mediaBreakpointUp, Size, theme } from '@library/shared/utils';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  reviewStatisticsDTO: ReviewStatisticsDto;
  wordsPercentage: { inReview: number; known: number; inReviewAndKnown: number };
  wordsTotal: number;
};

export default function StatsReviewWindow(props: Props) {
  const { isOpen, onClose, reviewStatisticsDTO, wordsPercentage, wordsTotal } = props;

  const { colorMode } = useColorMode();
  const { t } = useTranslation();
  const { data: user } = useGetUserQuery();
  const { data: allWordPacks = [] } = useGetAllWordPacksQuery();
  const { isOpen: isOpenDrawer, onOpen: onOpenDrawer, onClose: onCloseDrawer } = useDisclosure();

  const wordPack = allWordPacks.find((item) => item.name === reviewStatisticsDTO.wordPackName);

  if (!user) return <Spinner />;

  return (
    <Modal
      size={Size.XL}
      width='360px'
      isOpen={isOpen}
      onClose={onClose}
      header={I18nHelper.getWordPackNameTranslated(reviewStatisticsDTO.wordPackName, user, t)}
      body={(
        <>
          <PackProgress $colorMode={colorMode}>
            <WordPackNameAndInfoButton>
              <Text size={Size.XL} fontWeight={FontWeight.SEMIBOLD}>{t('StatsReviewWindow.packProgress.title')}</Text>
              <ArrowRightButton onClick={onOpenDrawer} />
              {isOpenDrawer && wordPack && (
                <ReviewWordPackWindow isOpen={isOpenDrawer} onClose={onCloseDrawer} wordPack={wordPack} />
              )}
            </WordPackNameAndInfoButton>
            <StatsRow>
              <Percentage>
                <Text size={{ base: Size.MD, md: Size.XL, xl: Size.XL }} fontWeight={FontWeight.SEMIBOLD}>
                  {`${wordsPercentage.known}%`}
                </Text>
                <Text size={{ base: Size.XS, md: Size.SM, xl: Size.SM }} fontWeight={FontWeight.SEMIBOLD}>
                  {t('StatsReviewWindow.packProgress.known')}
                </Text>
              </Percentage>
              <Text size={{ base: Size.SM, md: Size.MD, xl: Size.MD }} fontWeight={FontWeight.SEMIBOLD}>
                {`${reviewStatisticsDTO.wordsKnown}/${wordsTotal}`}
              </Text>
            </StatsRow>
            <ProgressBar value={wordsPercentage.known} />
          </PackProgress>
          <ReviewStatus $colorMode={colorMode}>
            <Text size={Size.XL} fontWeight={FontWeight.SEMIBOLD}>{t('StatsReviewWindow.reviewStatus.title')}</Text>
            <StatsContainer>
              <ProgressCircular
                value={wordsPercentage.inReviewAndKnown}
                text={t('StatsReviewWindow.reviewStatus.inReview')}
                isWithLabel
              />
              <StatsColumn>
                <Stat>
                  <Text size={{ base: Size.XL, md: Size.XXXL, xl: Size.XXXL }}>
                    {reviewStatisticsDTO.wordsInReview + reviewStatisticsDTO.wordsKnown}
                  </Text>
                  <Text size={{ base: Size.XS, md: Size.MD, xl: Size.MD }} fontWeight={FontWeight.SEMIBOLD}>
                    {t('StatsReviewWindow.reviewStatus.wordsInReview')}
                  </Text>
                </Stat>
                <Stat>
                  <Text size={{ base: Size.XL, md: Size.XXXL, xl: Size.XXXL }}>
                    {reviewStatisticsDTO.wordsNew}
                  </Text>
                  <Text size={{ base: Size.XS, md: Size.MD, xl: Size.MD }} fontWeight={FontWeight.SEMIBOLD}>
                    {t('StatsReviewWindow.reviewStatus.unseenWords')}
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
