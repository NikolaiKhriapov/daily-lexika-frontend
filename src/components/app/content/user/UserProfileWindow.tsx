import React, { useContext, useRef, useState } from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';
import { Avatar, Stack, useDisclosure } from '@chakra-ui/react';
import { AuthContext } from '@context/app/AuthContext';
import { errorNotification, successNotification } from '@services/app/popup-notification';
import {
  useDeleteAccountMutation,
  useGetUserInfoQuery,
  useUpdatePasswordMutation,
  useUpdateUserInfoMutation,
} from '@store/api/userAPI';
import { RoleName, RoleNameBase } from '@utils/app/constants';
import { ButtonType, Size } from '@utils/constants';
import { theme } from '@utils/theme';
import { Language, PasswordUpdateRequest, UserDto } from '@utils/types';
import Button from '@components/ui-common/basic/Button';
import AlertDialog from '@components/ui-common/complex/AlertDialog';
import ButtonsContainer from '@components/ui-common/complex/ButtonsContainer';
import InputFieldsWithButton from '@components/ui-common/complex/InputFieldsWithButton';
import InputFieldWithButton from '@components/ui-common/complex/InputFieldWithButton';
import Modal from '@components/ui-common/complex/Modal';
import SelectWithButton from '@components/ui-common/complex/SelectWithButton';
import TextInput from '@components/ui-common/complex/TextInput';
import ValidationHelper from '@helpers/ValidationHelper';
import WordDataHelper from '@helpers/WordDataHelper';

type Props = {
  isOpen: boolean;
  onClose: any;
};

export default function UserProfileWindow(props: Props) {
  const { isOpen, onClose } = props;

  const { logout } = useContext(AuthContext);
  const { data: user } = useGetUserInfoQuery();
  const { isOpen: isOpenChangePasswordButton, onOpen: onOpenChangePasswordButton, onClose: onCloseChangePasswordButton } = useDisclosure();
  const { isOpen: isOpenDeleteAccountButton, onOpen: onOpenDeleteAccountButton, onClose: onCloseDeleteAccountButton } = useDisclosure();
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const passwordCurrentRef = useRef<string>('');
  const [selectedTranslationLanguage, setSelectedTranslationLanguage] = useState<Language>(user!.translationLanguage!);

  const [updateUserInfo] = useUpdateUserInfoMutation();
  const [updatePassword] = useUpdatePasswordMutation();
  const [deleteAccount] = useDeleteAccountMutation();

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

  const handleChangePassword = (passwordUpdateRequest: PasswordUpdateRequest, setSubmitting: any) => {
    updatePassword(passwordUpdateRequest)
      .unwrap()
      .then(() => successNotification('Password updated successfully', ''))
      .catch((error) => errorNotification('', error))
      .finally(() => setSubmitting(false));
  };

  const handleDeleteAccount = () => {
    setButtonDisabled(true);
    deleteAccount()
      .unwrap()
      .then(() => {
        successNotification('Account deleted successfully', '');
        logout();
      })
      .catch((error) => errorNotification('', error))
      .finally(() => setButtonDisabled(false));
  };

  const userAccountWindowData = {
    name: {
      initialValues: { name: user && user.name, email: user && user.email },
      validationSchema: Yup.object({ name: ValidationHelper.nameValidator() }),
      onSubmit: (userUpdatedInfoDTO: UserDto, { setSubmitting }: any) => {
        setSubmitting(true);
        handleChangeInfo(userUpdatedInfoDTO, setSubmitting);
        onClose();
      },
      inputElement: <TextInput label='Name' name='name' type='text' placeholder='Name' />,
    },
    email: {
      initialValues: { email: user && user.email, name: user && user.name },
      validationSchema: Yup.object({ email: ValidationHelper.emailValidator() }),
      onSubmit: (userUpdatedInfoDTO: UserDto, { setSubmitting }: any) => {
        setSubmitting(true);
        handleChangeInfo(userUpdatedInfoDTO, setSubmitting);
        logout();
      },
      inputElement: <TextInput label='Email' name='email' type='email' placeholder='Email' />,
    },
    password: {
      initialValues: { passwordCurrent: '' },
      validationSchema: Yup.object({ passwordCurrent: ValidationHelper.passwordValidator() }),
      onSubmit: (values: { passwordCurrent: string }) => {
        passwordCurrentRef.current = values.passwordCurrent;
        onOpenChangePasswordButton();
      },
      inputElement: <TextInput label='Password' name='passwordCurrent' type='password' placeholder='Current password' />,
    },
  };

  const passwordChangeData = {
    initialValues: { passwordNewFirst: '', passwordNewSecond: '' },
    validationSchema: Yup.object({ passwordNewFirst: ValidationHelper.passwordValidator(), passwordNewSecond: ValidationHelper.passwordRepeatValidator() }),
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
            <AvatarStyled size='2xl' />
          </ProfileImageContainer>
          <InputFieldWithButton
            buttonText='Change'
            validateOnMount
            initialValues={userAccountWindowData.name.initialValues}
            validationSchema={userAccountWindowData.name.validationSchema}
            onSubmit={userAccountWindowData.name.onSubmit}
            inputElements={userAccountWindowData.name.inputElement}
          />
          <SelectWithButton
            id="translationLanguage"
            name="translationLanguage"
            label="Translation language"
            value={selectedTranslationLanguage}
            buttonText='Change'
            onChange={(e: any) => setSelectedTranslationLanguage(e.target.value as Language)}
            isDisabled={selectedTranslationLanguage === user!.translationLanguage}
            isRequired
            validateOnMount
            initialValues={selectedTranslationLanguage}
            onSubmit={() => handleChangeInfo({ ...user, translationLanguage: selectedTranslationLanguage })}
            selectElements={availableTranslationLanguages[user!.role! as RoleNameBase].map((language, index) => (
              <option key={index} value={language}>{WordDataHelper.toSentenceCase(language)}</option>
            ))}
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

const AvatarStyled = styled(Avatar)`
  background-color: ${theme.colors.mainBlue} !important;
`;
