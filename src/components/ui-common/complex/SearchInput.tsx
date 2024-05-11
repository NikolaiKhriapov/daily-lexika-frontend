import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { InputGroup, InputRightElement, useColorMode } from '@chakra-ui/react';
import { Size } from '@utils/constants';
import { theme } from '@utils/theme';
import Input from '@components/ui-common/basic/Input';
import Spinner from '@components/ui-common/basic/Spinner';

interface Props {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
}

export default function SearchInput(props: Props) {
  const { searchQuery, setSearchQuery, isLoading } = props;

  const { colorMode } = useColorMode();

  useEffect(() => {
    setSearchQuery('');
  }, [isLoading]);

  return (
    <InputGroup size="md">
      <Input
        name="search"
        type="text"
        placeholder="Start typing a word..."
        width={{ base: '100%', md: '500px' }}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        isDisabled={isLoading}
        backgroundColor={theme.colors[colorMode].background2}
      />
      <InputRightElement width="2.9rem">
        {isLoading && <Spinner size={Size.SM} />}
      </InputRightElement>
    </InputGroup>
  );
}
