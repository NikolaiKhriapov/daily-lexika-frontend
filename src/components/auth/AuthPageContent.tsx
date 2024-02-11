import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import * as Yup from 'yup';
import { useRadioGroup } from '@chakra-ui/radio';
import { Box, ColorMode, useColorMode } from '@chakra-ui/react';
import { AuthContext } from '@context/AuthContext';
import { AuthPageContext } from '@context/AuthPageContext';
import { register } from '@services/authorization';
import { errorNotification, successNotification } from '@services/popup-notification';
import { AppInfo, AuthFormType, Breakpoint, ButtonType, LocalStorage, Page, Platform, Size } from '@utils/constants';
import { borderStyles, mediaBreakpointUp } from '@utils/functions';
import { theme } from '@utils/theme';
import { AuthenticationRequest, RegistrationRequest } from '@utils/types';
import Button from '@components/common/basic/Button';
import Heading from '@components/common/basic/Heading';
import Link from '@components/common/basic/Link';
import RadioItem from '@components/common/basic/RadioItem';
import InputFieldsWithButton from '@components/common/complex/InputFieldsWithButton';
import TextInput from '@components/common/complex/TextInput';

export default function AuthPageContent() {
  const router = useRouter();
  const { colorMode } = useColorMode();
  const { user, setUserFromToken, login } = useContext(AuthContext);
  const { authFormType, setAuthFormType } = useContext(AuthPageContext);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>(Platform.ENGLISH);

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
        handleOnSubmit: (values: RegistrationRequest | AuthenticationRequest, { setSubmitting }: any) => {
          setSubmitting(true);
          login({ ...values, platform: selectedPlatform! })
            .then(() => router.push(Page.REVIEWS))
            .catch((error) => console.error(error.code, error.response.data.message))
            .finally(() => setSubmitting(false));
        },
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
        handleOnSubmit: (values: any, { setSubmitting }: any) => {
          setSubmitting(true);
          register({ ...values, platform: selectedPlatform })
            .then((response) => {
              successNotification('User registered', `${values.name} was successfully registered`);
              global.localStorage.setItem(LocalStorage.ACCESS_TOKEN, response.data.token);
              setUserFromToken();
              router.push(Page.REVIEWS);
            })
            .catch((error) => errorNotification(error.code, error.response.data.message))
            .finally(() => setSubmitting(false));
        },
      },
      submitButtonText: 'Sign up',
    },
  };

  useEffect(() => {
    if (user) {
      router.push(Page.REVIEWS);
    }
  });

  const onClickSwitchAuthFormType = () => setAuthFormType(authFormType === AuthFormType.LOGIN ? AuthFormType.REGISTER : AuthFormType.LOGIN);

  const { getRootProps, getRadioProps } = useRadioGroup({
    defaultValue: Platform.ENGLISH,
    onChange: (selected) => setSelectedPlatform(selected as Platform),
  });
  const group = getRootProps();
  const transformPlatformName = (value: Platform) => value.substring(0, 1).toUpperCase() + value.substring(1).toLowerCase();

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
              <RadioContainer {...group}>
                {Object.values(Platform).map((value) => (
                  <RadioItem key={value} {...getRadioProps({ value })} name={transformPlatformName(value)} />
                ))}
              </RadioContainer>
              {authFormType === AuthFormType.REGISTER && (
                <TextInput label="Name" name="name" type="text" placeholder="Name" />
              )}
              <TextInput label="Email" name="email" type="email" placeholder="Email address" />
              <PasswordFieldContainer>
                <TextInput label="Password" name="password" type="password" placeholder="Password" />
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
    width: 400px;
    padding: 30px;
  }
`;

const RadioContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
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
  gap: 15px;

  ${mediaBreakpointUp(Breakpoint.TABLET)} {
    gap: 20px;
  }

  ${mediaBreakpointUp(Breakpoint.DESKTOP)} {
    gap: 25px;
  }
`;
