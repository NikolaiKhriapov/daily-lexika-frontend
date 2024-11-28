import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import * as Yup from 'yup';
import { Box, ColorMode, useColorMode } from '@chakra-ui/react';
import { AuthContext } from '@daily-budget/context/AuthContext';
import ValidationHelper from '@daily-budget/helpers/ValidationHelper';
import { useLoginMutation, useRegisterMutation } from '@daily-budget/store/api/authAPI';
import { useAppDispatch, useAppSelector } from '@daily-budget/store/hooks/hooks';
import { toggleAuthFormType } from '@daily-budget/store/reducers/authPageSlice';
import { EmailLinks } from '@daily-budget/utils/constants';
import { AuthFormType } from '@daily-budget/utils/types/AuthFormType';
import { AuthenticationRequest, RegistrationRequest } from '@library/daily-budget';
import { errorNotification } from '@library/shared/services';
import { Button, ButtonType, Heading, InputFieldsWithButton, Link, TextInput } from '@library/shared/ui';
import { borderStyles, Breakpoint, mediaBreakpointUp , Size , theme } from '@library/shared/utils';

export default function AuthContent() {
  const dispatch = useAppDispatch();
  const { colorMode } = useColorMode();
  const { t } = useTranslation();
  const { setUserFromToken } = useContext(AuthContext);
  const { authFormType } = useAppSelector((state) => state.authPageSlice);
  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();
  const [isCredentialsInvalid, setCredentialsInvalid] = useState(false);

  const performLogin = (authenticationRequest: AuthenticationRequest) => {
    login(authenticationRequest)
      .unwrap()
      .then((response) => setUserFromToken(response.token))
      .catch((error) => {
        errorNotification('', error);
        setCredentialsInvalid(true);
      });
  };

  const performRegister = (registrationRequest: RegistrationRequest) => {
    register(registrationRequest)
      .unwrap()
      .then((response) => setUserFromToken(response.token))
      .catch((error) => errorNotification('', error));
  };

  const pageData = {
    [AuthFormType.LOGIN]: {
      heading: 'Sign in to your account',
      linkText: 'Don\'t have an account? Sign up',
      form: {
        initialValues: { email: '', password: '' },
        validationSchema: Yup.object({ email: ValidationHelper.emailValidator(t), password: ValidationHelper.passwordValidator(t) }),
        handleOnSubmit: (values: AuthenticationRequest) =>
          performLogin({ email: values.email, password: values.password }),
      },
      submitButtonText: 'Sign in',
    },
    [AuthFormType.REGISTER]: {
      heading: 'Register account',
      linkText: 'Already have an account? Sign in',
      form: {
        initialValues: { email: '', password: '' },
        validationSchema: Yup.object({ email: ValidationHelper.emailValidator(t), password: ValidationHelper.passwordValidator(t) }),
        handleOnSubmit: (request: RegistrationRequest) => performRegister(request),
      },
      submitButtonText: 'Sign up',
    },
  };

  const onClickSwitchAuthFormType = () => {
    setCredentialsInvalid(false);
    dispatch(toggleAuthFormType());
  };

  return (
    <Container $colorMode={colorMode}>
      <Heading size={Size.LG}>{pageData[authFormType].heading}</Heading>
      <AuthForm $colorMode={colorMode}>
        <InputFieldsWithButton
          validateOnMount
          initialValues={pageData[authFormType].form.initialValues}
          validationSchema={pageData[authFormType].form.validationSchema}
          onSubmit={pageData[authFormType].form.handleOnSubmit}
          inputElements={(
            <InputElements>
              <TextInput label="Email" name="email" type="email" placeholder="Email address" isRequired isError={isCredentialsInvalid} />
              <PasswordFieldContainer>
                <TextInput label="Password" name="password" type="password" placeholder="Password (8-20 characters)" isRequired isError={isCredentialsInvalid} />
                {authFormType === AuthFormType.LOGIN && (
                  <ForgotPasswordContainer>
                    <Link href={EmailLinks.PasswordRecovery}>
                      Forgot password?
                    </Link>
                  </ForgotPasswordContainer>
                )}
              </PasswordFieldContainer>
            </InputElements>
          )}
          buttonText={pageData[authFormType].submitButtonText}
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
