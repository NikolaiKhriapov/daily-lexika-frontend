import React, { useState } from 'react';
import styled from 'styled-components';
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';
import { useGetPageOfLogsQuery } from '@admin/store/api/dailyLexikaLogAPI';
import { Heading, TableFilters, TablePagesPanel } from '@library/shared/ui';
import { DateTimeUtil, Locale, Sort } from '@library/shared/utils';

export default function LogsPageContent() {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  const { data: pageResponse, refetch } = useGetPageOfLogsQuery({ page, size, sort: Sort.DESC });

  if (!pageResponse) return <></>;

  const dailyLexikaLogs = pageResponse.content;

  return (
    <Container>
      <Heading>Daily Lexika – Logs</Heading>
      <TableFilters refetch={refetch} />
      <TablePagesPanel pageResponse={pageResponse} setPage={setPage} setSize={setSize} />
      <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>User ID</Th>
              <Th>User e-mail</Th>
              <Th>Action</Th>
              <Th>Platform</Th>
              <Th>Timestamp</Th>
              <Th>Comment</Th>
            </Tr>
          </Thead>
          <Tbody>
            {dailyLexikaLogs.map((log) => (
              <Tr key={log.id}>
                <Td>{log.id}</Td>
                <Td>{log.userId}</Td>
                <Td>{log.userEmail}</Td>
                <Td>{log.action}</Td>
                <Td>{log.platform}</Td>
                <Td>{DateTimeUtil.convertOffsetDateTimeToDateString(log.timestamp, Locale.EN_US)}</Td>
                <Td>{log.comment}</Td>
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
