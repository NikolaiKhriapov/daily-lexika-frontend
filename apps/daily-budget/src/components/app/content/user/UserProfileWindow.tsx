import React, { useContext, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import * as Yup from 'yup';
import { Avatar, Stack, useDisclosure } from '@chakra-ui/react';
import { AuthContext } from '@daily-budget/context/AuthContext';
import ValidationHelper from '@daily-budget/helpers/ValidationHelper';
import {
  useDeleteAccountMutation, useGetUserQuery, useUpdatePasswordMutation, useUpdateUserInfoMutation,
} from '@daily-budget/store/api/userAPI';
import { AccountDeletionRequest, PasswordUpdateRequest, UserDto } from '@library/daily-budget';
import { errorNotification, successNotification } from '@library/shared/services';
import {
  AlertDialog, Button, ButtonsContainer, ButtonType, InputFieldsWithButton, InputFieldWithButton, Modal, TextInput
} from '@library/shared/ui';
import { Size, theme } from '@library/shared/utils';

type Props = {
  isOpen: boolean;
  onClose: any;
};

export default function UserProfileWindow(props: Props) {
  const { isOpen, onClose } = props;

  const passwordCurrentRef = useRef<string>('');
  const { t } = useTranslation();
  const { logout } = useContext(AuthContext);
  const { data: user } = useGetUserQuery();
  const { isOpen: isOpenChangePasswordButton, onOpen: onOpenChangePasswordButton, onClose: onCloseChangePasswordButton } = useDisclosure();
  const { isOpen: isOpenDeleteAccountButton, onOpen: onOpenDeleteAccountButton, onClose: onCloseDeleteAccountButton } = useDisclosure();
  const { isOpen: isOpenDeleteAccountAlertDialog, onOpen: onOpenDeleteAccountAlertDialog, onClose: onCloseDeleteAccountAlertDialog } = useDisclosure();
  const [updateUserInfo] = useUpdateUserInfoMutation();
  const [updatePassword] = useUpdatePasswordMutation();
  const [deleteAccount] = useDeleteAccountMutation();
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [accountDeletionRequest, setAccountDeletionRequest] = useState<AccountDeletionRequest>({ passwordCurrent: '' });

  const handleUpdateInfo = (userUpdatedInfoDTO: UserDto, setSubmitting?: any) => {
    updateUserInfo(userUpdatedInfoDTO)
      .unwrap()
      .then(() => successNotification(t('UserProfileWindow.successMessage.updateInfo')))
      .catch((error) => errorNotification('', error))
      .finally(() => setSubmitting && setSubmitting(false));
  };

  const handleUpdatePassword = (request: PasswordUpdateRequest, setSubmitting: any) => {
    updatePassword(request)
      .unwrap()
      .then(() => successNotification(t('UserProfileWindow.successMessage.updatePassword')))
      .catch((error) => errorNotification('', error))
      .finally(() => setSubmitting(false));
  };

  const handleDeleteAccount = (request: AccountDeletionRequest) => {
    setButtonDisabled(true);
    deleteAccount(request)
      .unwrap()
      .then(() => {
        successNotification(t('UserProfileWindow.successMessage.deleteAccount'));
        logout();
      })
      .catch((error) => errorNotification('', error))
      .finally(() => setButtonDisabled(false));
  };

  const userAccountWindowData = {
    email: {
      initialValues: { email: user && user.email },
      validationSchema: Yup.object({ email: ValidationHelper.emailValidator(t) }),
      onSubmit: (userUpdatedInfoDTO: UserDto, { setSubmitting }: any) => {
        setSubmitting(true);
        handleUpdateInfo(userUpdatedInfoDTO, setSubmitting);
        logout();
      },
      inputElement: (
        <TextInput
          name='email'
          type='email'
          label={t('UserProfileWindow.email')}
          placeholder={t('UserProfileWindow.email')}
        />
      ),
    },
    password: {
      initialValues: { passwordCurrent: '' },
      validationSchema: Yup.object({ passwordCurrent: ValidationHelper.passwordValidator(t) }),
      onSubmit: (values: { passwordCurrent: string }) => {
        passwordCurrentRef.current = values.passwordCurrent;
        onOpenChangePasswordButton();
      },
      inputElement: (
        <TextInput
          name='passwordCurrent'
          type='password'
          label={t('UserProfileWindow.password.current.label')}
          placeholder={t('UserProfileWindow.password.current.placeholder')}
        />
      ),
    },
  };

  const passwordChangeData = {
    initialValues: { passwordNewFirst: '', passwordNewSecond: '' },
    validationSchema: Yup.object({ passwordNewFirst: ValidationHelper.passwordValidator(t), passwordNewSecond: ValidationHelper.passwordRepeatValidator(t) }),
    onSubmit: (values: { passwordNewFirst: string, passwordNewSecond: string }, { setSubmitting }: any) => {
      setSubmitting(true);
      const request: PasswordUpdateRequest = { passwordCurrent: passwordCurrentRef.current, passwordNew: values.passwordNewFirst };
      handleUpdatePassword(request, setSubmitting);
      onClose();
    },
    inputElement: (
      <>
        <TextInput
          name="passwordNewFirst"
          type="password"
          label={t('UserProfileWindow.password.new.label')}
          placeholder={t('UserProfileWindow.password.new.placeholder')}
        />
        <TextInput
          name="passwordNewSecond"
          type="password"
          label={t('UserProfileWindow.password.repeat.label')}
          placeholder={t('UserProfileWindow.password.repeat.placeholder')}
        />
      </>
    ),
  };

  const accountDeletionData = {
    initialValues: { passwordCurrent: '' },
    validationSchema: Yup.object({ passwordCurrent: ValidationHelper.passwordValidator(t) }),
    onSubmit: (values: { passwordCurrent: string }, { setSubmitting }: any) => {
      setSubmitting(true);
      const request: AccountDeletionRequest = { passwordCurrent: values.passwordCurrent };
      setAccountDeletionRequest(request);
      onOpenDeleteAccountAlertDialog();
    },
    inputElement: (
      <TextInput
        name="passwordCurrent"
        type="password"
        label={t('UserProfileWindow.password.new.label')}
        placeholder={t('UserProfileWindow.password.new.label')}
      />
    ),
  };

  return (
    <Modal
      size={Size.MD}
      width='450px'
      isOpen={isOpen}
      onClose={onClose}
      header={t('UserProfileWindow.header')}
      body={(
        <>
          <ProfileImageContainer>
            <AvatarStyled size='2xl' />
          </ProfileImageContainer>
          <InputFieldWithButton
            buttonText={t('buttonText.change')}
            validateOnMount={false}
            initialValues={userAccountWindowData.email.initialValues}
            validationSchema={userAccountWindowData.email.validationSchema}
            onSubmit={userAccountWindowData.email.onSubmit}
            inputElements={userAccountWindowData.email.inputElement}
          />
          <InputFieldWithButton
            buttonText={t('buttonText.change')}
            validateOnMount={false}
            initialValues={userAccountWindowData.password.initialValues}
            validationSchema={userAccountWindowData.password.validationSchema}
            onSubmit={userAccountWindowData.password.onSubmit}
            inputElements={userAccountWindowData.password.inputElement}
          />
          <ButtonsContainer>
            <Stack>
              <Button
                buttonText={t('UserProfileWindow.deleteAccountButton')}
                buttonType={ButtonType.BUTTON_RED}
                onClick={onOpenDeleteAccountButton}
              />
            </Stack>
          </ButtonsContainer>
          {isOpenChangePasswordButton && (
            <Modal
              onClose={onCloseChangePasswordButton}
              isOpen={isOpenChangePasswordButton}
              header={t('UserProfileWindow.password.new.header')}
              body={(
                <InputFieldsWithButton
                  buttonText={t('buttonText.update')}
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
            <>
              <Modal
                onClose={onCloseDeleteAccountButton}
                isOpen={isOpenDeleteAccountButton}
                header={t('UserProfileWindow.AlertDialog.header')}
                body={(
                  <InputFieldsWithButton
                    buttonText={t('buttonText.delete')}
                    validateOnMount
                    initialValues={accountDeletionData.initialValues}
                    validationSchema={accountDeletionData.validationSchema}
                    onSubmit={accountDeletionData.onSubmit}
                    inputElements={accountDeletionData.inputElement}
                  />
                )}
              />
              <AlertDialog
                isOpen={isOpenDeleteAccountAlertDialog}
                onClose={onCloseDeleteAccountAlertDialog}
                handleDelete={() => handleDeleteAccount(accountDeletionRequest)}
                header={t('UserProfileWindow.AlertDialog.header')}
                body={t('UserProfileWindow.AlertDialog.body')}
                cancelButtonText={t('buttonText.cancel')}
                deleteButtonText={t('buttonText.delete')}
                isButtonDisabled={isButtonDisabled}
              />
            </>
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
