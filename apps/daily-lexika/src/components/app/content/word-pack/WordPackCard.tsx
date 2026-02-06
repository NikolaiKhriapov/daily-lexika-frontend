import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TbCards } from 'react-icons/tb';
import styled from 'styled-components';
import { useColorMode, useDisclosure } from '@chakra-ui/react';
import CreateOrUpdateReviewWindow from '@daily-lexika/components/app/content/review/CreateOrUpdateReviewWindow';
import ReviewWordPackWindow from '@daily-lexika/components/app/content/word-pack/ReviewWordPackWindow';
import SearchWindow from '@daily-lexika/components/app/content/word-pack/SearchWindow';
import I18nHelper from '@daily-lexika/helpers/I18nHelper';
import WordDataHelper from '@daily-lexika/helpers/WordDataHelper';
import WordPackHelper from '@daily-lexika/helpers/WordPackHelper';
import { useGetUserQuery } from '@daily-lexika/store/api/userAPI';
import { useDeleteCustomWordPackMutation } from '@daily-lexika/store/api/wordPacksAPI';
import { placeholderWordPack } from '@daily-lexika/utils/placeholderEntities';
import { Category, WordPackUserDto } from '@library/daily-lexika';
import { errorNotification, successNotification } from '@library/shared/services';
import {
  AlertDialog, Button, ButtonsContainer, ButtonType, ButtonUnavailable, ButtonWithIcon, ButtonWithIconType, Card,
  Skeleton, Text, UnderDevelopmentIcon
} from '@library/shared/ui';
import { FontWeight, Size, theme } from '@library/shared/utils';

type Props = {
  wordPack: WordPackUserDto;
};

export default function WordPackCard(props: Props) {
  const { wordPack } = props;

  const { colorMode } = useColorMode();
  const { t } = useTranslation();
  const { data: user } = useGetUserQuery();
  const { isOpen: isOpenPreviewButton, onOpen: onOpenPreviewButton, onClose: onClosePreviewButton } = useDisclosure();
  const { isOpen: isOpenCreateButton, onOpen: onOpenCreateButton, onClose: onCloseCreateButton } = useDisclosure();
  const { isOpen: isOpenDeleteButton, onOpen: onOpenDeleteButton, onClose: onCloseDeleteButton } = useDisclosure();
  const { isOpen: isOpenSearch, onOpen: onOpenSearch, onClose: onCloseSearch } = useDisclosure();
  const [deleteWordPack, { isLoading: isLoadingDeleteWordPack }] = useDeleteCustomWordPackMutation();
  const [isFlipped, setFlipped] = useState(false);
  const [isDisabledCreateButton, setDisabledCreateButton] = useState(false);

  if (!user || wordPack.name === placeholderWordPack.name) return <Skeleton height={280} width={215} />;

  const handleDeleteCustomWordPack = () => {
    onCloseDeleteButton();
    deleteWordPack(wordPack.id!)
      .unwrap()
      .then(() => successNotification(t('WordPackCard.AlertDialog.successMessage')))
      .catch((error) => errorNotification('', error));
  };

  const onClickCreateButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onOpenCreateButton();
  };
  const onClickPreviewButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onOpenPreviewButton();
  };
  const onClickAddWordButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onOpenSearch();
  };
  const onClickDeleteButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onOpenDeleteButton();
  };

  const wordPacksUnderDevelopment = ['HSK 6', 'HSK 7-9'];

  return (
    <Card
      height='280px'
      width='215px'
      padding='0 25px'
      bgColor={theme.colors[colorMode].bgColor}
      isFlipped={isFlipped}
      setFlipped={setFlipped}
      face={(
        <ContentsContainer>
          <WordPackNameContainer>
            <Text size={Size.XXL} fontWeight={FontWeight.MEDIUM} isCentered>
              {I18nHelper.getWordPackNameTranslated(wordPack.name, t)}
            </Text>
            {wordPacksUnderDevelopment.includes(WordDataHelper.getOriginalWordPackName(wordPack.name)) && (
              <UnderDevelopmentIcon tooltipText={t('WordPackCard.underDevelopmentMessage')} />
            )}
          </WordPackNameContainer>
          <WordsCountContainer>
            <TbCards size={20} />&nbsp;<Text size={Size.MD}>{wordPack.wordsTotal}</Text>
          </WordsCountContainer>
          <ButtonsContainer>
            {wordPack.reviewId !== null
              ? <ButtonUnavailable text={t('buttonText.added')} isWithIcon />
              : (
                <Button
                  size={Size.SM}
                  buttonText={t('buttonText.createDailyReview')}
                  buttonType={ButtonType.BUTTON}
                  onClick={onClickCreateButton}
                  isOpen={isOpenCreateButton}
                  isDisabled={isDisabledCreateButton || isLoadingDeleteWordPack}
                  modalContent={(
                    <CreateOrUpdateReviewWindow
                      isOpen={isOpenCreateButton}
                      onClose={onCloseCreateButton}
                      wordPack={wordPack}
                      setDisabledButton={setDisabledCreateButton}
                    />
                  )}
                />
              )}
          </ButtonsContainer>
        </ContentsContainer>
      )}
      back={(
        <ContentsContainer>
          <DescriptionContainer>
            <Text size={Size.SM} isCentered>{WordPackHelper.getDescriptionForLanguage(wordPack, user)}</Text>
          </DescriptionContainer>
          <ButtonsContainer>
            <ButtonWithIcon
              type={ButtonWithIconType.PREVIEW}
              onClick={onClickPreviewButton}
              isDisabled={isLoadingDeleteWordPack}
              isOpen={isOpenPreviewButton}
              modalContent={(
                <ReviewWordPackWindow
                  isOpen={isOpenPreviewButton}
                  onClose={onClosePreviewButton}
                  wordPack={wordPack}
                />
              )}
            />
            {wordPack.category.toLowerCase() === Category.CUSTOM.toLowerCase() && (
              <>
                <ButtonWithIcon
                  type={ButtonWithIconType.CHANGE}
                  onClick={onClickAddWordButton}
                  isDisabled={isLoadingDeleteWordPack}
                  isOpen={isOpenSearch}
                  modalContent={(
                    <SearchWindow
                      isOpen={isOpenSearch}
                      onClose={onCloseSearch}
                      wordPack={wordPack}
                    />
                  )}
                />
                <ButtonWithIcon
                  type={ButtonWithIconType.DELETE}
                  onClick={onClickDeleteButton}
                  isDisabled={isLoadingDeleteWordPack}
                  isOpen={isOpenDeleteButton}
                  modalContent={(
                    <AlertDialog
                      isOpen={isOpenDeleteButton}
                      onClose={onCloseDeleteButton}
                      handleDelete={handleDeleteCustomWordPack}
                      header={t('WordPackCard.AlertDialog.header')}
                      body={t('WordPackCard.AlertDialog.body')}
                      cancelButtonText={t('buttonText.cancel')}
                      deleteButtonText={t('buttonText.delete')}
                      isButtonDisabled={isLoadingDeleteWordPack}
                      width='600px'
                    />
                  )}
                />
              </>
            )}
          </ButtonsContainer>
        </ContentsContainer>
      )}
    />
  );
}

const ContentsContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 85%;
`;

const WordPackNameContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const WordsCountContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const DescriptionContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
