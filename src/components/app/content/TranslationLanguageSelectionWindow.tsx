import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { errorNotification } from '@services/app/popup-notification';
import { useGetUserQuery, useUpdateUserInfoMutation } from '@store/api/userAPI';
import { ButtonType, Size } from '@utils/constants';
import { Language } from '@utils/types';
import Button from '@components/ui-common/basic/Button';
import Text from '@components/ui-common/basic/Text';
import Modal from '@components/ui-common/complex/Modal';
import WordDataHelper from '@helpers/WordDataHelper';

export default function TranslationLanguageSelectionWindow() {
  const { t } = useTranslation();
  const { data: user } = useGetUserQuery();
  const [updateUserInfo] = useUpdateUserInfoMutation();

  const onClick = (language: Language) => {
    updateUserInfo({ ...user, translationLanguage: language.toUpperCase() as Language })
      .unwrap()
      .catch((error) => errorNotification('', error));
  };

  if (!user) return <></>;

  return (
    <Modal
      size={Size.MD}
      width='600px'
      isOpen
      onClose={() => null}
      showCloseButton={false}
      header={t('TranslationLanguageSelectionWindow.header')}
      isHeaderCentered
      body={(
        <>
          <TextContainer>
            <Text isCentered>{t('TranslationLanguageSelectionWindow.messageLineOne')}</Text>
            <Text isCentered>{t('TranslationLanguageSelectionWindow.messageLineTwo')}</Text>
          </TextContainer>
          <ButtonsContainer>
            {WordDataHelper.getAvailableTranslationLanguages(user).map((language, index) => (
              <Button
                key={index}
                buttonType={ButtonType.SUBMIT}
                buttonText={WordDataHelper.toSentenceCase(language)}
                onClick={() => onClick(language)}
              />
            ))}
          </ButtonsContainer>
        </>
      )}
    />
  );
}

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
`;
