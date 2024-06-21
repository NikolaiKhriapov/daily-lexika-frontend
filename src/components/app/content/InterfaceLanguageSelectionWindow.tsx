import React from 'react';
import styled from 'styled-components';
import { errorNotification } from '@services/app/popup-notification';
import { useGetUserQuery, useUpdateUserInfoMutation } from '@store/api/userAPI';
import { ButtonType, Size } from '@utils/constants';
import { Language } from '@utils/types';
import Button from '@components/ui-common/basic/Button';
import Text from '@components/ui-common/basic/Text';
import Modal from '@components/ui-common/complex/Modal';
import WordDataHelper from '@helpers/WordDataHelper';

export default function InterfaceLanguageSelectionWindow() {
  const { data: user } = useGetUserQuery();
  const [updateUserInfo] = useUpdateUserInfoMutation();

  const onClick = (language: Language) => {
    updateUserInfo({ ...user, interfaceLanguage: language.toUpperCase() as Language })
      .unwrap()
      .catch((error) => errorNotification('', error));
  };

  return (
    <Modal
      size={Size.MD}
      width='600px'
      isOpen
      onClose={() => null}
      showCloseButton={false}
      header='Please select interface language'
      isHeaderCentered
      body={(
        <>
          <TextContainer>
            <Text isCentered>This language will be used for the user interface.</Text>
            <Text isCentered>You can change it later in the settings.</Text>
          </TextContainer>
          <ButtonsContainer>
            {Object.values(Language).map((language, index) => (
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
