import React, { useState } from 'react';
import { TbCards } from 'react-icons/tb';
import styled from 'styled-components';
import { useColorMode, useDisclosure } from '@chakra-ui/react';
import { errorNotification, successNotification } from '@services/popup-notification';
import { useGetUserInfoQuery } from '@store/api/userAPI';
import { useDeleteCustomWordPackMutation, wordPacksAPI } from '@store/api/wordPacksAPI';
import { useAppDispatch } from '@store/hooks/hooks';
import { ButtonType, ButtonWithIconType, FontWeight, Size } from '@utils/constants';
import { getOriginalWordPackName } from '@utils/functions';
import { theme } from '@utils/theme';
import { Category, placeholderWordPack, WordPackDTO } from '@utils/types';
import Button from '@components/common/basic/Button';
import ButtonWithIcon from '@components/common/basic/ButtonWithIcon';
import Skeleton, { SkeletonType } from '@components/common/basic/Skeleton';
import Spinner from '@components/common/basic/Spinner';
import Text from '@components/common/basic/Text';
import AlertDialog from '@components/common/complex/AlertDialog';
import ButtonsContainer from '@components/common/complex/ButtonsContainer';
import ButtonUnavailable from '@components/common/complex/ButtonUnavailable';
import Card from '@components/common/complex/Card';
import CreateOrUpdateReviewWindow from '@components/review/CreateOrUpdateReviewWindow';
import ReviewWordPackWindow from '@components/word-pack/ReviewWordPackWindow';
import SearchWindow from '@components/word-pack/SearchWindow';

type Props = {
  wordPack: WordPackDTO;
};

export default function WordPackCard(props: Props) {
  const { wordPack } = props;

  const dispatch = useAppDispatch();
  const { colorMode } = useColorMode();
  const { isOpen: isOpenPreviewButton, onOpen: onOpenPreviewButton, onClose: onClosePreviewButton } = useDisclosure();
  const { isOpen: isOpenCreateButton, onOpen: onOpenCreateButton, onClose: onCloseCreateButton } = useDisclosure();
  const { isOpen: isOpenDeleteButton, onOpen: onOpenDeleteButton, onClose: onCloseDeleteButton } = useDisclosure();
  const { isOpen: isOpenSearch, onOpen: onOpenSearch, onClose: onCloseSearch } = useDisclosure();
  const [isFlipped, setFlipped] = useState(false);
  const [isDisabledCreateButton, setDisabledCreateButton] = useState(false);

  const { data: user } = useGetUserInfoQuery();
  const [deleteWordPack, { isLoading: isLoadingDeleteWordPack }] = useDeleteCustomWordPackMutation();
  dispatch(wordPacksAPI.util.prefetch('getAllWordsForWordPack', { wordPackName: wordPack.name, page: 0, size: 20 }, { force: false }));

  if (!user) return <Spinner />;

  const handleDeleteCustomWordPack = () => {
    onCloseDeleteButton();
    deleteWordPack(wordPack.name)
      .unwrap()
      .then(() => successNotification('Word Pack deleted successfully', `${getOriginalWordPackName(wordPack.name, user)} deleted successfully`))
      .catch((error) => errorNotification('', error.data.message));
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

  if (wordPack.name === placeholderWordPack.name) {
    return <Skeleton type={SkeletonType.WORD_PACK_CARD} />;
  }

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
            <Text size={Size.XXL} fontWeight={FontWeight.MEDIUM} isCentered>{getOriginalWordPackName(wordPack.name, user)}</Text>
          </WordPackNameContainer>
          <WordsCountContainer>
            <TbCards />
            <Text size={Size.MD}>{wordPack.totalWords}</Text>
          </WordsCountContainer>
          <ButtonsContainer>
            {wordPack.reviewId !== undefined
              ? <ButtonUnavailable text='Added' isWithIcon />
              : (
                <Button
                  size={Size.SM}
                  buttonText="Create Daily Review"
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
            <Text size={{ base: Size.SM, md: Size.MD, xl: Size.MD }} isCentered>{wordPack.description}</Text>
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
                  wordPackDTO={wordPack}
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
                      header="Delete this word pack?"
                      body="If you have a review for this word pack, it will also be removed."
                      deleteButtonText="Delete"
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 85%;
`;

const WordPackNameContainer = styled.div`
  display: flex;
  justify-content: center;
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
