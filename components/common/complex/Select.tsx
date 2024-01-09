import { Box, FormLabel, Select as ChakraSelect, SelectProps } from '@chakra-ui/react';
import React from 'react';
import { Field, FieldProps } from 'formik';
import { theme } from '../../../src/utils/theme';

interface Props extends SelectProps {
  name: string;
  label: string;
}

export default function Select({ name, label, children, ...rest }: Props) {
  return (
    <Box>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Field name={name}>
        {({ field }: FieldProps) => (
          <ChakraSelect
            onChange={field.onChange}
            onBlur={field.onBlur}
            value={field.value}
            focusBorderColor={theme.colors.gray['400']}
            {...rest}
          >
            {children}
          </ChakraSelect>
        )}
      </Field>
    </Box>

  );
}
