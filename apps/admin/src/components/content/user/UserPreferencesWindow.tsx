import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ColorMode, useColorMode } from '@chakra-ui/react';
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
  const [selectedColorMode, setSelectedColorMode] = useState(colorMode);

  const availableColorSchemes: Record<ColorMode, string> = {
    light: t('UserPreferencesWindow.colorScheme.light'),
    dark: t('UserPreferencesWindow.colorScheme.dark'),
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
        </>
      )}
    />
  );
}
