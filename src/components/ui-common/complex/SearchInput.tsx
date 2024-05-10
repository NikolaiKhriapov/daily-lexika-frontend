import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { InputGroup, InputRightElement } from '@chakra-ui/react';
import { Size } from '@utils/constants';
import Input from '@components/ui-common/basic/Input';
import Spinner from '@components/ui-common/basic/Spinner';

interface Props {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
}

export default function SearchInput(props: Props) {
  const { searchQuery, setSearchQuery, isLoading } = props;

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
      />
      <InputRightElement width="2.9rem">
        {isLoading && <Spinner size={Size.SM} />}
      </InputRightElement>
    </InputGroup>
  );
}
