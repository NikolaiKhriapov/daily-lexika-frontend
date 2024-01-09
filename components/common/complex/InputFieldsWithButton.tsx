import { Form, Formik } from 'formik';
import styled from 'styled-components';
import React from 'react';
import { Breakpoint, ButtonType } from '../../../src/utils/constants';
import Button from '../basic/Button';
import { mediaBreakpointUp } from '../../../src/utils/functions';

type Props = {
  validateOnMount: boolean;
  initialValues: any;
  validationSchema: any;
  onSubmit: any;
  inputElements: React.ReactNode;
  buttonText: string;
  isButtonDisabled?: boolean;
};

InputFieldsWithButton.defaultProps = {
  isButtonDisabled: false,
};

export default function InputFieldsWithButton(props: Props) {
  const { validateOnMount, initialValues, validationSchema, onSubmit, inputElements, buttonText, isButtonDisabled } = props;

  return (
    <Formik
      validateOnMount={validateOnMount}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isValid, isSubmitting }) => (
        <FormStyled>
          {inputElements}
          <Button
            buttonText={buttonText}
            buttonType={ButtonType.SUBMIT}
            isDisabled={!(isValid) || isSubmitting || isButtonDisabled}
          />
        </FormStyled>
      )}
    </Formik>
  );
}

const FormStyled = styled(Form)`
  display: flex;
  flex-direction: column;

  gap: 20px;

  ${mediaBreakpointUp(Breakpoint.TABLET)} {
    gap: 25px;
  }

  ${mediaBreakpointUp(Breakpoint.DESKTOP)} {
    gap: 30px;
  }
`;
