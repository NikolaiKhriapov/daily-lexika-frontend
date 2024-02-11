import React from 'react';
import * as Yup from 'yup';
import { errorNotification, successNotification } from '@services/popup-notification';
import { createCustomWordPack } from '@services/word-packs';
import { Size } from '@utils/constants';
import { WordPackDTO } from '@utils/types';
import Text from '@components/common/basic/Text';
import InputFieldsWithButton from '@components/common/complex/InputFieldsWithButton';
import Modal from '@components/common/complex/Modal';
import TextInput from '@components/common/complex/TextInput';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CreateWordPackWindow(props: Props) {
  const { isOpen, onClose, setReload } = props;

  const initialValues = {
    name: '',
    description: 'Custom word pack',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
  });

  const handleOnSubmit = (wordPack: WordPackDTO, { setSubmitting }: any) => {
    setSubmitting(true);
    createCustomWordPack(wordPack)
      .then(() => {
        successNotification('Word Pack saved', `${wordPack.name} was successfully saved`);
        setReload(true);
        onClose();
      })
      .catch((error) => errorNotification(error.code, error.response.data.message))
      .finally(() => setSubmitting(false));
  };

  return (
    <Modal
      size={Size.MD}
      width='450px'
      isOpen={isOpen}
      onClose={onClose}
      header='Create Word Pack'
      body={(
        <InputFieldsWithButton
          validateOnMount
          initialValues={initialValues}
          validationSchema={validationSchema}
          inputElements={(
            <>
              <TextInput
                label="Name"
                name="name"
                type="text"
                placeholder="Name"
              />
              <TextInput
                label="Description"
                name="description"
                type="text"
                placeholder="Description"
              />
              <Text>{'These settings can be edited at any time. Stick with the defaults if you\'re not sure.'}</Text>
            </>
          )}
          buttonText="Submit"
          onSubmit={handleOnSubmit}
          isButtonDisabled={false}
        />
      )}
    />
  );
}
