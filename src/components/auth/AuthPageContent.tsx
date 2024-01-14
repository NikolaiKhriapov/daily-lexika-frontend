import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import * as Yup from 'yup';
import { Box, ColorMode, useColorMode } from '@chakra-ui/react';
import { AuthContext } from '@context/AuthContext';
import { AuthPageContext } from '@context/AuthPageContext';
import { register } from '@services/authorization';
import { successNotification } from '@services/popup-notification';
import { AuthFormType, Breakpoint, ButtonType, LocalStorage, Page, Platform, Size } from '@utils/constants';
import { borderStyles, mediaBreakpointUp } from '@utils/functions';
import { theme } from '@utils/theme';
import { AuthenticationRequest, RegistrationRequest } from '@utils/types';
import Button from '@components/common/basic/Button';
import Heading from '@components/common/basic/Heading';
import InputFieldsWithButton from '@components/common/complex/InputFieldsWithButton';
import Select from '@components/common/complex/Select';
import TextInput from '@components/common/complex/TextInput';

export default function AuthPageContent() {
  const router = useRouter();
  const { colorMode } = useColorMode();
  const { user, setUserFromToken, login } = useContext(AuthContext);
  const { authFormType, setAuthFormType } = useContext(AuthPageContext);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>();

  const pageData = {
    [AuthFormType.LOGIN]: {
      heading: 'Sign in to your account',
      linkText: 'Don\'t have an account? Register now',
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
        handleOnSubmit: (values: RegistrationRequest | AuthenticationRequest, { setSubmitting }: any) => {
          setSubmitting(true);
          login({ ...values, platform: selectedPlatform! })
            .then(() => router.push(Page.REVIEWS))
            .catch((error) => console.error(error.code, error.response.data.message))
            .finally(() => setSubmitting(false));
        },
      },
    },
    [AuthFormType.REGISTER]: {
      heading: 'Register account',
      linkText: 'Already have an account? Log in now',
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
        handleOnSubmit: (values: any, { setSubmitting }: any) => {
          setSubmitting(true);
          register({ ...values, platform: selectedPlatform })
            .then((response) => {
              successNotification('User registered', `${values.name} was successfully registered`);
              global.localStorage.setItem(LocalStorage.ACCESS_TOKEN, response.data.data.authenticationResponse.token);
              setUserFromToken();
              router.push(Page.REVIEWS);
            })
            .catch((error) => console.error(error.code, error.response.data.message))
            .finally(() => setSubmitting(false));
        },
      },
    },
  };

  useEffect(() => {
    if (user) {
      router.push(Page.REVIEWS);
    }
  });

  const onClick = () => setAuthFormType(authFormType === AuthFormType.LOGIN ? AuthFormType.REGISTER : AuthFormType.LOGIN);

  return (
    <Container $colorMode={colorMode}>
      <Heading size={Size.LG}>{pageData[authFormType].heading}</Heading>
      <AuthForm boxShadow="2xl" $colorMode={colorMode}>
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
              <TextInput label="Password" name="password" type="password" placeholder="Password" />
              <Select
                id="platform"
                name="platform"
                label="Platform"
                placeholder="Select platform"
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value as Platform)}
                isRequired
              >
                <option value={Platform.ENGLISH}>English</option>
                <option value={Platform.CHINESE}>Chinese</option>
              </Select>
            </InputElements>
          )}
          buttonText="Submit"
        />
      </AuthForm>
      <Button onClick={onClick} buttonText={pageData[authFormType].linkText} buttonType={ButtonType.LINK} />
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
  gap: 30px;

  ${mediaBreakpointUp(Breakpoint.TABLET)} {
    gap: 35px;
  }

  ${mediaBreakpointUp(Breakpoint.DESKTOP)} {
    gap: 40px;
  }
`;

const AuthForm = styled(Box)<{ $colorMode: ColorMode }>`
  width: 320px;
  max-width: 90%;
  padding: 20px;
  background-color: ${({ $colorMode }) => theme.colors[$colorMode].bgColor};
  border: ${({ $colorMode }) => borderStyles($colorMode)};
  border-radius: ${theme.stylesToDelete.borderRadius};

  ${mediaBreakpointUp(Breakpoint.TABLET)} {
    width: 350px;
    padding: 30px;
  }
`;

const InputElements = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;

  ${mediaBreakpointUp(Breakpoint.TABLET)} {
    gap: 20px;
  }

  ${mediaBreakpointUp(Breakpoint.DESKTOP)} {
    gap: 25px;
  }
`;
