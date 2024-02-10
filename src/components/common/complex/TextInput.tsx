import React from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { Field, FieldProps, useFormikContext } from 'formik';
import { Box, FormLabel, IconButton, InputGroup, InputProps, InputRightElement } from '@chakra-ui/react';
import { theme } from '@utils/theme';
import Input from '@components/common/basic/Input';

interface Props extends InputProps {
  label: string;
  name: string;
}

export default function TextInput(props: Props) {
  const { label, name, type, placeholder } = props;

  const { errors, touched } = useFormikContext<any>();
  const [isShown, setShown] = React.useState(false);
  const onClickShow = () => setShown(!isShown);

  return (
    <Box>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Field name={name}>
        {({ field }: FieldProps) => (
          <InputGroup size="md">
            <Input
              type={type !== 'password' ? type : (isShown ? 'text' : 'password')}
              name={name}
              placeholder={placeholder}
              onChange={field.onChange}
              onBlur={field.onBlur}
              value={field.value}
              borderColor={errors[name] && touched[name] ? theme.colors.red['400'] : 'inherit'}
            />
            {type === 'password' && (
              <InputRightElement width="2.9rem">
                <IconButton
                  icon={isShown ? <HiEyeOff /> : <HiEye />}
                  onClick={onClickShow}
                  aria-label={isShown ? 'Mask password' : 'Reveal password'}
                  variant="text"
                />
              </InputRightElement>
            )}
          </InputGroup>
        )}
      </Field>
    </Box>
  );
}
