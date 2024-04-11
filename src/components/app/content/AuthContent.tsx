import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';
import { Box, ColorMode, FormLabel, Select as ChakraSelect, useColorMode } from '@chakra-ui/react';
import { AuthContext } from '@context/app/AuthContext';
import { errorNotification, successNotification } from '@services/app/popup-notification';
import { useLoginMutation, useRegisterMutation } from '@store/api/authAPI';
import { useAppDispatch, useAppSelector } from '@store/hooks/hooks';
import { toggleAuthFormType } from '@store/reducers/authPageSlice';
import { AppInfo, AuthFormType, Platform } from '@utils/app/constants';
import { Breakpoint, ButtonType, Size } from '@utils/constants';
import { borderStyles, mediaBreakpointUp } from '@utils/functions';
import { theme } from '@utils/theme';
import { AuthenticationRequest, RegistrationRequest } from '@utils/types';
import Button from '@components/ui-common/basic/Button';
import Heading from '@components/ui-common/basic/Heading';
import Link from '@components/ui-common/basic/Link';
import InputFieldsWithButton from '@components/ui-common/complex/InputFieldsWithButton';
import TextInput from '@components/ui-common/complex/TextInput';

export default function AuthContent() {
  const dispatch = useAppDispatch();
  const { colorMode } = useColorMode();
  const { setUserFromToken } = useContext(AuthContext);
  const { authFormType } = useAppSelector((state) => state.authPageSlice);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);

  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();

  const performLogin = (authenticationRequest: AuthenticationRequest) => {
    login(authenticationRequest)
      .unwrap()
      .then((response) => setUserFromToken(response.token))
      .catch((error) => errorNotification('', error));
  };

  const performRegister = (registrationRequest: RegistrationRequest) => {
    register(registrationRequest)
      .unwrap()
      .then((response) => {
        setUserFromToken(response.token);
        successNotification('User registered', `${registrationRequest.name} was successfully registered`);
      })
      .catch((error) => errorNotification('', error));
  };

  const pageData = {
    [AuthFormType.LOGIN]: {
      heading: 'Sign in to your account',
      linkText: 'Don\'t have an account? Sign up',
      form: {
        initialValues: { email: '', password: '' },
        validationSchema: Yup.object({
          email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
          password: Yup.string()
            .min(8, 'Must be at least 8 characters')
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
        }),
        handleOnSubmit: (values: AuthenticationRequest) =>
          performLogin({ ...values, platform: selectedPlatform! }),
      },
      submitButtonText: 'Sign in',
    },
    [AuthFormType.REGISTER]: {
      heading: 'Register account',
      linkText: 'Already have an account? Sign in',
      form: {
        initialValues: { name: '', email: '', password: '' },
        validationSchema: Yup.object({
          name: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
          email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
          password: Yup.string()
            .min(8, 'Must be at least 8 characters')
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
        }),
        handleOnSubmit: (values: RegistrationRequest) =>
          performRegister({ ...values, platform: selectedPlatform! }),
      },
      submitButtonText: 'Sign up',
    },
  };

  const onClickSwitchAuthFormType = () => dispatch(toggleAuthFormType());

  return (
    <Container $colorMode={colorMode}>
      <Heading size={Size.LG}>{pageData[authFormType].heading}</Heading>
      <AuthForm $colorMode={colorMode}>
        <FormLabel>I want to practice</FormLabel>
        <ChakraSelect
          id="platform"
          name="platform"
          placeholder="Select language"
          value={selectedPlatform || ''}
          onChange={(e) => setSelectedPlatform(e.target.value as Platform)}
          focusBorderColor={theme.colors.gray['400']}
        >
          <option value={Platform.ENGLISH}>English</option>
          <option value={Platform.CHINESE}>Chinese</option>
        </ChakraSelect>
      </AuthForm>
      <AuthForm $colorMode={colorMode}>
        <InputFieldsWithButton
          validateOnMount
          initialValues={pageData[authFormType].form.initialValues}
          validationSchema={pageData[authFormType].form.validationSchema}
          onSubmit={pageData[authFormType].form.handleOnSubmit}
          inputElements={(
            <InputElements>
              {authFormType === AuthFormType.REGISTER && (
                <TextInput label="Name" name="name" type="text" placeholder="Name" />
              )}
              <TextInput label="Email" name="email" type="email" placeholder="Email address" />
              <PasswordFieldContainer>
                <TextInput label="Password" name="password" type="password" placeholder="Password (8-20 characters)" />
                {authFormType === AuthFormType.LOGIN && (
                  <ForgotPasswordContainer>
                    <Link href={`mailto:${AppInfo.EMAIL}?subject=${AppInfo.EMAIL_PASSWORD_RECOVERY_SUBJECT}&body=${AppInfo.EMAIL_PASSWORD_RECOVERY_BODY}`}>
                      Forgot password?
                    </Link>
                  </ForgotPasswordContainer>
                )}
              </PasswordFieldContainer>
            </InputElements>
          )}
          buttonText={pageData[authFormType].submitButtonText}
          isButtonDisabled={!selectedPlatform}
        />
      </AuthForm>
      <Button buttonText={pageData[authFormType].linkText} buttonType={ButtonType.LINK} onClick={onClickSwitchAuthFormType} />
    </Container>
  );
}

const Container = styled.div<{ $colorMode: ColorMode }>`
  height: calc(100vh - 70px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ $colorMode }) => theme.colors[$colorMode].background};
  gap: 10px;

  ${mediaBreakpointUp(Breakpoint.PHONE_LG)} {
    gap: 20px;
  }
`;

const AuthForm = styled(Box)<{ $colorMode: ColorMode }>`
  width: 320px;
  max-width: 90%;
  padding: 10px 15px;
  background-color: ${({ $colorMode }) => theme.colors[$colorMode].bgColor};
  border: ${({ $colorMode }) => borderStyles($colorMode)};
  border-radius: ${theme.stylesToDelete.borderRadius};
  box-shadow: ${({ $colorMode }) => theme.stylesToDelete[$colorMode].boxShadow};

  ${mediaBreakpointUp(Breakpoint.PHONE_LG)} {
    padding: 20px;
  }

    ${mediaBreakpointUp(Breakpoint.TABLET)} {
    width: 400px;
    padding: 30px;
  }
`;

const PasswordFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ForgotPasswordContainer = styled.div`
  display: flex;
  justify-content: right;
`;

const InputElements = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  ${mediaBreakpointUp(Breakpoint.TABLET)} {
    gap: 15px;
  }
    
  ${mediaBreakpointUp(Breakpoint.TABLET)} {
    gap: 20px;
  }

  ${mediaBreakpointUp(Breakpoint.DESKTOP)} {
    gap: 25px;
  }
`;
