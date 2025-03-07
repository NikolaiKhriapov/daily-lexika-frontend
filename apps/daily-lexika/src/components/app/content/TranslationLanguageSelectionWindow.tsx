import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useGetUserQuery, useUpdateUserInfoMutation } from '@daily-lexika/store/api/userAPI';
import { Language } from '@library/daily-lexika';
import { errorNotification } from '@library/shared/services';
import { Button, ButtonType, Modal,Text } from '@library/shared/ui';
import { Size, StringUtil } from '@library/shared/utils';

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
            {Object.values(Language).map((language, index) => (
              <Button
                key={index}
                buttonType={ButtonType.SUBMIT}
                buttonText={StringUtil.toSentenceCase(language)}
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
