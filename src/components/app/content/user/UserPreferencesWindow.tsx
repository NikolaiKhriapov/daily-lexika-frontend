import React, { useState } from 'react';
import { ColorMode, useColorMode } from '@chakra-ui/react';
import { errorNotification, successNotification } from '@services/app/popup-notification';
import { useGetUserInfoQuery, useUpdateUserInfoMutation } from '@store/api/userAPI';
import { RoleName, RoleNameBase } from '@utils/app/constants';
import { Size } from '@utils/constants';
import { Language, UserDto } from '@utils/types';
import Modal from '@components/ui-common/complex/Modal';
import SelectWithButton from '@components/ui-common/complex/SelectWithButton';
import WordDataHelper from '@helpers/WordDataHelper';

type Props = {
  isOpen: boolean;
  onClose: any;
};

export default function UserPreferencesWindow(props: Props) {
  const { isOpen, onClose } = props;

  const { colorMode, setColorMode } = useColorMode();
  const { data: user } = useGetUserInfoQuery();
  const [selectedColorMode, setSelectedColorMode] = useState(colorMode);
  const [selectedTranslationLanguage, setSelectedTranslationLanguage] = useState(user!.translationLanguage!);

  const [updateUserInfo] = useUpdateUserInfoMutation();

  const availableTranslationLanguages = {
    [RoleName.USER_ENGLISH]: [Language.ENGLISH, Language.RUSSIAN],
    [RoleName.USER_CHINESE]: [Language.ENGLISH, Language.CHINESE],
  };

  const handleChangeInfo = (userUpdatedInfoDTO: UserDto, setSubmitting?: any) => {
    updateUserInfo(userUpdatedInfoDTO)
      .unwrap()
      .then(() => successNotification('User information updated successfully', ''))
      .catch((error) => errorNotification('', error))
      .finally(() => setSubmitting && setSubmitting(false));
  };

  return (
    <Modal
      size={Size.MD}
      isOpen={isOpen}
      onClose={onClose}
      header='Preferences'
      body={(
        <>
          <SelectWithButton
            id="colorScheme"
            name="colorScheme"
            label="Color scheme"
            value={selectedColorMode}
            buttonText='Change'
            onChange={(e) => setSelectedColorMode(e.target.value as ColorMode)}
            isDisabled={selectedColorMode === colorMode}
            isRequired
            validateOnMount
            initialValues={selectedColorMode}
            onSubmit={() => setColorMode(selectedColorMode)}
            selectElements={['light', 'dark'].map((colorScheme, index) => (
              <option key={index} value={colorScheme}>{WordDataHelper.toSentenceCase(colorScheme)}</option>
            ))}
          />
          <SelectWithButton
            id="translationLanguage"
            name="translationLanguage"
            label="Translation language"
            value={selectedTranslationLanguage}
            buttonText='Change'
            onChange={(e) => setSelectedTranslationLanguage(e.target.value as Language)}
            isDisabled={selectedTranslationLanguage === user!.translationLanguage}
            isRequired
            validateOnMount
            initialValues={selectedTranslationLanguage}
            onSubmit={() => handleChangeInfo({ ...user, translationLanguage: selectedTranslationLanguage })}
            selectElements={availableTranslationLanguages[user!.role! as RoleNameBase].map((language, index) => (
              <option key={index} value={language}>{WordDataHelper.toSentenceCase(language)}</option>
            ))}
          />
        </>
      )}
    />
  );
}
