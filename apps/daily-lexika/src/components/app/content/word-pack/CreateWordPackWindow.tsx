import React from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import WordDataHelper from '@daily-lexika/helpers/WordDataHelper';
import { useGetUserQuery } from '@daily-lexika/store/api/userAPI';
import { useCreateCustomWordPackMutation, useGetAllWordPacksQuery } from '@daily-lexika/store/api/wordPacksAPI';
import { WordPackDto } from '@library/daily-lexika';
import { InputFieldsWithButton, Modal, Text, TextInput } from '@library/shared/ui';
import { Size } from '@library/shared/utils';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CreateWordPackWindow(props: Props) {
  const { isOpen, onClose } = props;

  const { t } = useTranslation();
  const { data: user } = useGetUserQuery();
  const { data: allWordPacks = [] } = useGetAllWordPacksQuery();
  const [createCustomWordPack, { isLoading: isLoadingCreateCustomWordPack }] = useCreateCustomWordPackMutation();

  const initialValues = {
    name: '',
    description: t('CreateWordPackWindow.description.initValue'),
  };

  const validationSchema = Yup.object({
    name: Yup.string().trim().required(' ')
      .test((value) => {
        const allWordPackNames = allWordPacks.map((wordPack) => WordDataHelper.getOriginalWordPackName(wordPack.name, user!));
        return !allWordPackNames.includes(value) && !value.includes(';');
      }),
    description: Yup.string().trim().required(' '),
  });

  const handleOnSubmit = (wordPack: WordPackDto) => {
    onClose();
    createCustomWordPack(wordPack);
  };

  return (
    <Modal
      size={Size.MD}
      width='450px'
      isOpen={isOpen}
      onClose={onClose}
      header={t('CreateWordPackWindow.header')}
      body={(
        <InputFieldsWithButton
          validateOnMount
          initialValues={initialValues}
          validationSchema={validationSchema}
          inputElements={(
            <>
              <TextInput
                label={t('CreateWordPackWindow.name')}
                name="name"
                type="text"
                placeholder={t('CreateWordPackWindow.name')}
              />
              <TextInput
                label={t('CreateWordPackWindow.description.label')}
                name="description"
                type="text"
                placeholder={t('CreateWordPackWindow.description.label')}
              />
              <Text>{t('CreateWordPackWindow.hint')}</Text>
            </>
          )}
          buttonText="Create"
          onSubmit={handleOnSubmit}
          isButtonDisabled={isLoadingCreateCustomWordPack}
        />
      )}
    />
  );
}
