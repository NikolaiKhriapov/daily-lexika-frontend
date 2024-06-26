import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import * as Yup from 'yup';
import { Box, ColorMode, useColorMode } from '@chakra-ui/react';
import { AuthContext } from '@admin/context/AuthContext';
import ValidationHelper from '@admin/helpers/ValidationHelper';
import { useLoginMutation } from '@admin/store/api/authAPI';
import { AuthenticationRequest } from '@admin/utils/types';
import { errorNotification } from '@library/shared/services';
import { Heading, InputFieldsWithButton, TextInput } from '@library/shared/ui';
import { borderStyles, Breakpoint, mediaBreakpointUp , Size , theme } from '@library/shared/utils';

export default function AuthContent() {
  const { colorMode } = useColorMode();
  const { t } = useTranslation();
  const { setUserFromToken } = useContext(AuthContext);
  const [login] = useLoginMutation();
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

  const formData = {
    initialValues: { email: '', password: '' },
    validationSchema: Yup.object({ email: ValidationHelper.emailValidator(t), password: ValidationHelper.passwordValidator(t) }),
    handleOnSubmit: (values: AuthenticationRequest) => performLogin({ email: values.email, password: values.password }),
  };

  return (
    <Container $colorMode={colorMode}>
      <Heading size={Size.LG}>Sign in to your account</Heading>
      <AuthForm $colorMode={colorMode}>
        <InputFieldsWithButton
          validateOnMount
          initialValues={formData.initialValues}
          validationSchema={formData.validationSchema}
          onSubmit={formData.handleOnSubmit}
          inputElements={(
            <InputElements>
              <TextInput label="Email" name="email" type="email" placeholder="Email address" isRequired isError={isCredentialsInvalid} />
              <PasswordFieldContainer>
                <TextInput label="Password" name="password" type="password" placeholder="Password (8-20 characters)" isRequired isError={isCredentialsInvalid} />
              </PasswordFieldContainer>
            </InputElements>
          )}
          buttonText='Sign in'
          isButtonDisabled={false}
        />
      </AuthForm>
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
