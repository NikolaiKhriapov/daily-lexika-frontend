import React from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { useGetUserQuery } from '@store/api/userAPI';
import { useCreateCustomWordPackMutation, useGetAllWordPacksQuery } from '@store/api/wordPacksAPI';
import { Size } from '@utils/constants';
import { WordPackDto } from '@utils/types';
import Text from '@components/ui-common/basic/Text';
import InputFieldsWithButton from '@components/ui-common/complex/InputFieldsWithButton';
import Modal from '@components/ui-common/complex/Modal';
import TextInput from '@components/ui-common/complex/TextInput';
import WordDataHelper from '@helpers/WordDataHelper';

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
