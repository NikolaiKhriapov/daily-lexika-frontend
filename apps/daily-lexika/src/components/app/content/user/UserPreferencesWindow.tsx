import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ColorMode, useColorMode } from '@chakra-ui/react';
import { useGetUserQuery, useUpdateUserInfoMutation } from '@daily-lexika/store/api/userAPI';
import { Language, UserDto } from '@library/daily-lexika';
import { errorNotification, successNotification } from '@library/shared/services';
import { Modal, SelectWithButton } from '@library/shared/ui';
import { Size } from '@library/shared/utils';

type Props = {
  isOpen: boolean;
  onClose: any;
};

export default function UserPreferencesWindow(props: Props) {
  const { isOpen, onClose } = props;

  const { colorMode, setColorMode } = useColorMode();
  const { t } = useTranslation();
  const { data: user } = useGetUserQuery();
  const [updateUserInfo] = useUpdateUserInfoMutation();
  const [selectedColorMode, setSelectedColorMode] = useState(colorMode);
  const [selectedTranslationLanguage, setSelectedTranslationLanguage] = useState(user!.translationLanguage!);
  const [selectedInterfaceLanguage, setSelectedInterfaceLanguage] = useState(user!.interfaceLanguage!);

  const availableColorSchemes: Record<ColorMode, string> = {
    light: t('UserPreferencesWindow.colorScheme.light'),
    dark: t('UserPreferencesWindow.colorScheme.dark'),
  };
  const availableLanguages = {
    [Language.ENGLISH]: t('UserPreferencesWindow.language.english'),
    [Language.RUSSIAN]: t('UserPreferencesWindow.language.russian'),
    [Language.CHINESE]: t('UserPreferencesWindow.language.chinese'),
  };

  const handleChangeInfo = (userUpdatedInfoDTO: UserDto, setSubmitting?: any) => {
    updateUserInfo(userUpdatedInfoDTO)
      .unwrap()
      .then(() => successNotification(t('UserPreferencesWindow.updateInfoSuccessMessage')))
      .catch((error) => errorNotification('', error))
      .finally(() => setSubmitting && setSubmitting(false));
  };

  return (
    <Modal
      size={Size.MD}
      width='450px'
      isOpen={isOpen}
      onClose={onClose}
      header={t('UserPreferencesWindow.header')}
      body={(
        <>
          <SelectWithButton
            id="colorScheme"
            name="colorScheme"
            label={t('UserPreferencesWindow.colorScheme.label')}
            value={selectedColorMode}
            buttonText={t('buttonText.change')}
            onChange={(e) => setSelectedColorMode(e.target.value as ColorMode)}
            isDisabled={selectedColorMode === colorMode}
            isRequired
            validateOnMount
            initialValues={selectedColorMode}
            onSubmit={() => setColorMode(selectedColorMode)}
            selectElements={Object.entries(availableColorSchemes).map(([colorScheme, text], index) => (
              <option key={index} value={colorScheme}>{text}</option>
            ))}
          />
          <SelectWithButton
            id="interfaceLanguage"
            name="interfaceLanguage"
            label={t('UserPreferencesWindow.interfaceLanguage')}
            value={selectedInterfaceLanguage}
            buttonText={t('buttonText.change')}
            onChange={(e) => setSelectedInterfaceLanguage(e.target.value as Language)}
            isDisabled={selectedInterfaceLanguage === user!.interfaceLanguage}
            isRequired
            validateOnMount
            initialValues={selectedInterfaceLanguage}
            onSubmit={() => handleChangeInfo({ ...user, interfaceLanguage: selectedInterfaceLanguage })}
            selectElements={Object.entries(availableLanguages).map(([language, text], index) => (
              <option key={index} value={language}>{text}</option>
            ))}
          />
          <SelectWithButton
            id="translationLanguage"
            name="translationLanguage"
            label={t('UserPreferencesWindow.translationLanguage')}
            value={selectedTranslationLanguage}
            buttonText={t('buttonText.change')}
            onChange={(e) => setSelectedTranslationLanguage(e.target.value as Language)}
            isDisabled={selectedTranslationLanguage === user!.translationLanguage}
            isRequired
            validateOnMount
            initialValues={selectedTranslationLanguage}
            onSubmit={() => handleChangeInfo({ ...user, translationLanguage: selectedTranslationLanguage })}
            selectElements={Object.entries(availableLanguages).map(([language, text], index) => (
              <option key={index} value={language}>{text}</option>
            ))}
          />
        </>
      )}
    />
  );
}
