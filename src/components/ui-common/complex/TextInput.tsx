import React from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { Field, FieldProps, useFormikContext } from 'formik';
import { FormControl, FormLabel, IconButton, InputGroup, InputProps, InputRightElement } from '@chakra-ui/react';
import { theme } from '@utils/theme';
import Input from '@components/ui-common/basic/Input';
import Text from '@components/ui-common/basic/Text';

interface Props extends InputProps {
  label: string;
  name: string;
  getHint?: any;
  isError?: boolean;
}

export default function TextInput(props: Props) {
  const { label, name, getHint, isRequired, type, placeholder, isError = false } = props;

  const { errors, touched } = useFormikContext<any>();
  const [isShown, setShown] = React.useState(false);

  const onClickShow = () => setShown(!isShown);

  const hint = (value: string) => (getHint(value));

  return (
    <FormControl isRequired={isRequired}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Field name={name}>
        {({ field }: FieldProps) => (
          <>
            <InputGroup size="md">
              <Input
                type={type !== 'password' ? type : (isShown ? 'text' : 'password')}
                name={name}
                placeholder={placeholder}
                onChange={field.onChange}
                onBlur={field.onBlur}
                value={field.value}
                borderColor={isError || (errors[name] && touched[name]) ? theme.colors.red['400'] : 'inherit'}
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
            {getHint && !errors[name] && <Text opacity='50%'>{hint(field.value)}</Text>}
            {errors[name] && touched[name] && <Text color={theme.colors.red['400']}>{errors[name]?.toString()}</Text>}
          </>
        )}
      </Field>
    </FormControl>
  );
}
