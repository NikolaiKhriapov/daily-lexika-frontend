import React, { RefObject, useContext, useRef, useState } from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';
import { Avatar, Stack, useDisclosure } from '@chakra-ui/react';
import { AuthContext } from '@context/AuthContext';
import { errorNotification, successNotification } from '@services/popup-notification';
import { deleteAccount, updatePassword, updateUserInfo } from '@services/user';
import { ButtonType, LocalStorage, Size } from '@utils/constants';
import { PasswordUpdateRequest, UserDTO } from '@utils/types';
import Button from '@components/common/basic/Button';
import AlertDialog from '@components/common/complex/AlertDialog';
import ButtonsContainer from '@components/common/complex/ButtonsContainer';
import InputFieldsWithButton from '@components/common/complex/InputFieldsWithButton';
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
  const { isOpen: isOpenChangePasswordButton, onOpen: onOpenChangePasswordButton, onClose: onCloseChangePasswordButton } = useDisclosure();
  const { isOpen: isOpenDeleteAccountButton, onOpen: onOpenDeleteAccountButton, onClose: onCloseDeleteAccountButton } = useDisclosure();
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const passwordCurrentRef = useRef<string>('');

  const handleChangeInfo = (userUpdatedInfoDTO: UserDTO, setSubmitting: any) => {
    updateUserInfo(userUpdatedInfoDTO)
      .then(() => successNotification('User information updated successfully', ''))
      .catch((error) => console.error(error.code, error.response.data.message))
      .finally(() => setSubmitting(false));
  };

  const handleChangePassword = (passwordUpdateRequest: PasswordUpdateRequest, setSubmitting: any) => {
    updatePassword(passwordUpdateRequest)
      .then(() => successNotification('Password updated successfully', ''))
      .catch((error) => errorNotification('', error.response.data.message))
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
      initialValues: { passwordCurrent: '' },
      validationSchema: Yup.object({
        passwordCurrent: Yup.string()
          .required('Password is required')
          .min(8, 'Must be at least 8 characters')
          .max(20, 'Must be 20 characters or less'),
      }),
      onSubmit: (values: { passwordCurrent: string }) => {
        passwordCurrentRef.current = values.passwordCurrent;
        onOpenChangePasswordButton();
      },
      inputElement: <TextInput label='Password' name='passwordCurrent' type='password' placeholder='Current password' />,
    },
  };

  const passwordChangeData = {
    initialValues: { passwordNewFirst: '', passwordNewSecond: '' },
    validationSchema: Yup.object({
      passwordNewFirst: Yup.string()
        .required('Password is required')
        .min(8, 'Must be at least 8 characters')
        .max(20, 'Must be 20 characters or less'),
      passwordNewSecond: Yup.string()
        .required('Password is required')
        .oneOf([Yup.ref('passwordNewFirst')], 'Passwords must match'),
    }),
    onSubmit: (values: { passwordNewFirst: string, passwordNewSecond: string }, { setSubmitting }: any) => {
      setSubmitting(true);
      const request: PasswordUpdateRequest = { passwordCurrent: passwordCurrentRef.current, passwordNew: values.passwordNewFirst };
      handleChangePassword(request, setSubmitting);
      onClose();
    },
    inputElement: (
      <>
        <TextInput label="Password" name="passwordNewFirst" type="password" placeholder="New password" />
        <TextInput label="Repeat Password" name="passwordNewSecond" type="password" placeholder="Repeat password" />
      </>
    ),
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
            </Stack>
          </ButtonsContainer>
          {isOpenChangePasswordButton && (
            <Modal
              onClose={onCloseChangePasswordButton}
              isOpen={isOpenChangePasswordButton}
              header='Change Password'
              body={(
                <InputFieldsWithButton
                  buttonText='Submit'
                  validateOnMount
                  initialValues={passwordChangeData.initialValues}
                  validationSchema={passwordChangeData.validationSchema}
                  onSubmit={passwordChangeData.onSubmit}
                  inputElements={passwordChangeData.inputElement}
                />
              )}
            />
          )}
          {isOpenDeleteAccountButton && (
            <AlertDialog
              isOpen={isOpenDeleteAccountButton}
              onClose={onCloseDeleteAccountButton}
              cancelRef={cancelRef}
              handleDelete={handleDeleteAccount}
              header='Delete Account'
              body={`Are you sure you want to delete account? You can't undo this action.`}
              deleteButtonText='Delete'
              isButtonDisabled={isButtonDisabled}
            />
          )}
        </>
      )}
    />
  );
}

const ProfileImageContainer = styled.div`
  display: flex;
  justify-content: center;
`;
