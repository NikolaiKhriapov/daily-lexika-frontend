import { RefObject, useContext, useRef, useState } from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';
import { Avatar, Stack, useDisclosure } from '@chakra-ui/react';
import { AuthContext } from '@context/AuthContext';
import { successNotification } from '@services/popup-notification';
import { deleteAccount, updateUserInfo } from '@services/user';
import { ButtonType, LocalStorage, Size } from '@utils/constants';
import { UserDTO } from '@utils/types';
import Button from '@components/common/basic/Button';
import AlertDialog from '@components/common/complex/AlertDialog';
import ButtonsContainer from '@components/common/complex/ButtonsContainer';
import InputFieldWithButton from '@components/common/complex/InputFieldWithButton';
import Modal from '@components/common/complex/Modal';
import TextInput from '@components/common/complex/TextInput';

type Props = {
  isOpen: boolean;
  onClose: any;
  userDTO: UserDTO;
};

export default function UserProfileWindow(props: Props) {
  const { isOpen, onClose, userDTO } = props;

  const { setUser, logout } = useContext(AuthContext);
  const cancelRef: RefObject<HTMLButtonElement> = useRef(null);
  const {
    isOpen: isOpenDeleteAccountButton, onOpen: onOpenDeleteAccountButton, onClose: onCloseDeleteAccountButton,
  } = useDisclosure();
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const handleChangeInfo = (userUpdatedInfoDTO: UserDTO, setSubmitting: any) => {
    updateUserInfo(userUpdatedInfoDTO)
      .then(() => successNotification('User information updated successfully', ''))
      .catch((error) => console.error(error.code, error.response.data.message))
      .finally(() => setSubmitting(false));
  };

  const handleChangePassword = (userUpdatedInfoDTO: UserDTO, setSubmitting: any) => {
    updateUserInfo(userUpdatedInfoDTO)
      .then(() => successNotification('Password updated successfully', ''))
      .catch((error) => console.error(error.code, error.response.data.message))
      .finally(() => setSubmitting(false));
  };

  const handleDeleteAccount = () => {
    setButtonDisabled(true);
    deleteAccount()
      .then(() => {
        successNotification('Account deleted successfully', '');
        logout();
      })
      .catch((error) => console.error(error.code, error.response.data.message))
      .finally(() => setButtonDisabled(false));
  };

  const userAccountWindowData = {
    name: {
      initialValues: { name: userDTO && userDTO.name },
      validationSchema: Yup.object({ name: Yup.string().max(15, 'Must be 15 characters or less') }),
      onSubmit: (userUpdatedInfoDTO: UserDTO, { setSubmitting }: any) => {
        setSubmitting(true);
        handleChangeInfo(userUpdatedInfoDTO, setSubmitting);
        const updatedUserDTO = { ...userDTO, name: userUpdatedInfoDTO.name };
        setUser(updatedUserDTO);
        onClose();
      },
      inputElement: <TextInput label='Name' name='name' type='text' placeholder='Name' />,
    },
    email: {
      initialValues: { email: userDTO && userDTO.email },
      validationSchema: Yup.object({ email: Yup.string().email('Invalid email address') }),
      onSubmit: (userUpdatedInfoDTO: UserDTO, { setSubmitting }: any) => {
        setSubmitting(true);
        handleChangeInfo(userUpdatedInfoDTO, setSubmitting);
        localStorage.removeItem(LocalStorage.ACCESS_TOKEN);
      },
      inputElement: <TextInput label='Email' name='email' type='email' placeholder='Email' />,
    },
    password: {
      initialValues: { password: '', repeatPassword: '' },
      validationSchema: Yup.object({
        password: Yup.string()
          .required('Password is required')
          .min(8, 'Must be at least 8 characters')
          .max(20, 'Must be 20 characters or less'),
        repeatPassword: Yup.string()
          .oneOf([Yup.ref('password')], 'Passwords must match'),
      }),
      onSubmit: (userUpdatedInfoDTO: UserDTO, { setSubmitting }: any) => {
        setSubmitting(true);
        handleChangePassword(userUpdatedInfoDTO, setSubmitting);
      },
      inputElement: (
        <>
          <TextInput label='Password' name='password' type='password' placeholder='New password' />
          <br />
          <TextInput label='Repeat Password' name='repeatPassword' type='password' placeholder='Repeat password' />
        </>
      ),
    },
  };

  return (
    <Modal
      size={Size.MD}
      isOpen={isOpen}
      onClose={onClose}
      header='Account'
      body={(
        <>
          <ProfileImageContainer>
            <Avatar size='2xl' />
          </ProfileImageContainer>
          <InputFieldWithButton
            buttonText='Change'
            validateOnMount
            initialValues={userAccountWindowData.name.initialValues}
            validationSchema={userAccountWindowData.name.validationSchema}
            onSubmit={userAccountWindowData.name.onSubmit}
            inputElements={userAccountWindowData.name.inputElement}
          />
          <InputFieldWithButton
            buttonText='Change'
            validateOnMount={false}
            initialValues={userAccountWindowData.email.initialValues}
            validationSchema={userAccountWindowData.email.validationSchema}
            onSubmit={userAccountWindowData.email.onSubmit}
            inputElements={userAccountWindowData.email.inputElement}
          />
          <InputFieldWithButton
            buttonText='Change'
            validateOnMount={false}
            initialValues={userAccountWindowData.password.initialValues}
            validationSchema={userAccountWindowData.password.validationSchema}
            onSubmit={userAccountWindowData.password.onSubmit}
            inputElements={userAccountWindowData.password.inputElement}
          />
          <ButtonsContainer>
            <Stack>
              <Button
                buttonText='Delete Account'
                buttonType={ButtonType.BUTTON_RED}
                onClick={onOpenDeleteAccountButton}
              />
              <AlertDialog
                isOpenDeleteButton={isOpenDeleteAccountButton}
                onCloseDeleteButton={onCloseDeleteAccountButton}
                cancelRef={cancelRef}
                handleDelete={handleDeleteAccount}
                header='Delete Account'
                body={`Are you sure you want to delete account? You can't undo this action.`}
                deleteButtonText='Delete'
                isButtonDisabled={isButtonDisabled}
              />
            </Stack>
          </ButtonsContainer>
        </>
      )}
    />
  );
}

const ProfileImageContainer = styled.div`
  display: flex;
  justify-content: center;
`;
