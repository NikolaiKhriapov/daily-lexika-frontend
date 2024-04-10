import React from 'react';
import * as Yup from 'yup';
import { useBreakpointValue } from '@chakra-ui/react';
import { errorNotification, successNotification } from '@services/popup-notification';
import { useGetUserInfoQuery } from '@store/api/userAPI';
import { useCreateCustomWordPackMutation, useGetAllWordPacksQuery } from '@store/api/wordPacksAPI';
import { Size } from '@utils/constants';
import { getOriginalWordPackName } from '@utils/functions';
import { WordPackDto } from '@utils/types';
import Text from '@components/common/basic/Text';
import InputFieldsWithButton from '@components/common/complex/InputFieldsWithButton';
import Modal from '@components/common/complex/Modal';
import TextInput from '@components/common/complex/TextInput';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CreateWordPackWindow(props: Props) {
  const { isOpen, onClose } = props;

  const { data: user } = useGetUserInfoQuery();
  const { data: allWordPacks = [] } = useGetAllWordPacksQuery();
  const [createCustomWordPack, { isLoading: isLoadingCreateCustomWordPack }] = useCreateCustomWordPackMutation();

  const initialValues = {
    name: '',
    description: 'Custom word pack',
  };

  const validationSchema = Yup.object({
    name: Yup.string().trim().required('Required')
      .test((value) => {
        const allWordPackNames = allWordPacks.map((wordPack) => getOriginalWordPackName(wordPack.name, user!));
        return !allWordPackNames.includes(value) && !value.includes(';');
      }),
    description: Yup.string().required('Required'),
  });

  const handleOnSubmit = (wordPack: WordPackDto) => {
    onClose();
    createCustomWordPack(wordPack)
      .unwrap()
      .then(() => successNotification('Word Pack saved', `${wordPack.name} was successfully saved`))
      .catch((error) => errorNotification('', error));
  };

  return (
    <Modal
      size={Size.MD}
      width={useBreakpointValue({ base: '350px', md: '450px' })}
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
          isButtonDisabled={isLoadingCreateCustomWordPack}
        />
      )}
    />
  );
}
