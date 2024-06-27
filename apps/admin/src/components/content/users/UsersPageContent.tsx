import React, { useState } from 'react';
import styled from 'styled-components';
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';
import { useGetPageOfUsersQuery } from '@admin/store/api/dailyLexikaUserAPI';
import { DateTimeUtil, Sort } from '@library/shared/utils';
import { Heading, TableFilters, TablePagesPanel } from '@library/shared/ui';
import LocaleHelper from '@daily-lexika/helpers/LocaleHelper';

export default function UsersPageContent() {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  const { data: pageResponse, refetch } = useGetPageOfUsersQuery({ page, size, sort: Sort.DESC });

  if (!pageResponse) return <></>;

  const dailyLexikaUsers = pageResponse.content;

  return (
    <Container>
      <Heading>Daily Lexika – Users</Heading>
      <TableFilters refetch={refetch} />
      <TablePagesPanel pageResponse={pageResponse} setPage={setPage} setSize={setSize} />
      <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>E-mail</Th>
              <Th>Role</Th>
              <Th>Date of Registration</Th>
              <Th>Interface Language</Th>
              <Th>Translation Language</Th>
            </Tr>
          </Thead>
          <Tbody>
            {dailyLexikaUsers.map((user) => (
              <Tr key={user.id}>
                <Td>{user.id}</Td>
                <Td>{user.email}</Td>
                <Td>{user.role}</Td>
                <Td>{DateTimeUtil.convertOffsetDateTimeToDateString(user.dateOfRegistration!, LocaleHelper.getLocaleFromUser(user))}</Td>
                <Td>{user.interfaceLanguage}</Td>
                <Td>{user.translationLanguage}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  width: 100%;
`;
