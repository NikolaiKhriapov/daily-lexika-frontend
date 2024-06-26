import React from 'react';
import styled from 'styled-components';
import { Form, Formik } from 'formik';
import { Breakpoint, mediaBreakpointUp } from '@library/shared/utils';

import { Button, ButtonType } from '../basic/Button';

type Props = {
  validateOnMount: boolean;
  initialValues: any;
  validationSchema: any;
  onSubmit: any;
  inputElements: React.ReactNode;
  buttonText: string;
  isButtonDisabled?: boolean;
};

export function InputFieldsWithButton(props: Props) {
  const { validateOnMount, initialValues, validationSchema, onSubmit, inputElements, buttonText, isButtonDisabled = false } = props;

  return (
    <Formik
      validateOnMount={validateOnMount}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isValid }) => (
        <FormStyled>
          {inputElements}
          <Button
            buttonText={buttonText}
            buttonType={ButtonType.SUBMIT}
            isDisabled={!(isValid) || isButtonDisabled}
          />
        </FormStyled>
      )}
    </Formik>
  );
}

const FormStyled = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 15px;

  ${mediaBreakpointUp(Breakpoint.PHONE_LG)} {
    gap: 20px;
  }

  ${mediaBreakpointUp(Breakpoint.TABLET)} {
    gap: 25px;
  }

  ${mediaBreakpointUp(Breakpoint.DESKTOP)} {
    gap: 30px;
  }
`;
