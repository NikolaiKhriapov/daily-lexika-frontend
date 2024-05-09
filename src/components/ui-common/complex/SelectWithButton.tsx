import React from 'react';
import styled from 'styled-components';
import { Form, Formik } from 'formik';
import { Box, SelectProps } from '@chakra-ui/react';
import { ButtonType } from '@utils/constants';
import Button from '@components/ui-common/basic/Button';
import Select from '@components/ui-common/complex/Select';

interface Props extends SelectProps {
  name: string;
  label: string;
  validateOnMount: boolean;
  initialValues: any;
  validationSchema?: any;
  onSubmit: any;
  selectElements: React.ReactNode;
  buttonText: string;
  isDisabled?: boolean;
}

export default function SelectWithButton(props: Props) {
  const { id, name, label, placeholder, value, onChange, isRequired, validateOnMount, initialValues, validationSchema, onSubmit, selectElements, buttonText, isDisabled = false } = props;

  return (
    <FormikStyled
      validateOnMount={validateOnMount}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isValid }) => (
        <FormStyled>
          <SelectContainer>
            <Select
              id={id}
              name={name}
              label={label}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              isRequired={isRequired}
            >
              {selectElements}
            </Select>
          </SelectContainer>
          <Button
            buttonText={buttonText}
            buttonType={ButtonType.SUBMIT}
            isDisabled={!isValid || isDisabled}
          />
        </FormStyled>
      )}
    </FormikStyled>
  );
}

const FormikStyled = styled(Formik)`
  display: flex;
  flex-direction: column;
`;

const FormStyled = styled(Form)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;

const SelectContainer = styled(Box)`
  flex: 1;
  margin-right: 10px;
`;
