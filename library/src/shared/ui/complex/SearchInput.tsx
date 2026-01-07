import React, { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { InputGroup, InputRightElement, useColorMode } from '@chakra-ui/react';
import { Size, theme } from '@library/shared/utils';

import { Input } from '../basic/Input';
import { Spinner } from '../basic/Spinner';

interface Props {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
}

export function SearchInput(props: Props) {
  const { searchQuery, setSearchQuery, isLoading } = props;

  const { colorMode } = useColorMode();
  const { t } = useTranslation();

  return (
    <InputGroup size="md">
      <Input
        name="search"
        type="text"
        placeholder={t('Search.input')}
        width={{ base: '100%', md: '500px' }}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        backgroundColor={theme.colors[colorMode].background2}
      />
      <InputRightElement width="2.9rem">
        {isLoading && <Spinner size={Size.SM} />}
      </InputRightElement>
    </InputGroup>
  );
}
