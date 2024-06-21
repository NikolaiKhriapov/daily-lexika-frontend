import React from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import styled from 'styled-components';
import { ColorMode, Select, useColorMode } from '@chakra-ui/react';
import { borderStyles, Breakpoint, mediaBreakpointUp, PageResponse,theme } from '@library/shared/utils';

import { Text } from '../basic/Text';

interface Props<T> {
  pageResponse: PageResponse<T>;
  setPage: (page: number) => void;
  setSize: (size: number) => void;
}

export function TablePagesPanel<T>(props: Props<T>) {
  const { pageResponse, setPage, setSize } = props;

  const { colorMode } = useColorMode();

  const onClickPreviousPage = () => {
    if (!pageResponse.first) {
      setPage(pageResponse.number - 1);
    }
  };
  const onClickNextPage = () => {
    if (!pageResponse.last) {
      setPage(pageResponse.number + 1);
    }
  };
  const onClickPage = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const onUpdateSize = (size: number) => {
    setPage(0);
    setSize(size);
  };

  const firstPageNumberToShow = pageResponse.first ? 0 : pageResponse.last ? (pageResponse.totalPages - 3) : (pageResponse.number - 1);
  const lastPageNumberToShow = pageResponse.first ? 2 : pageResponse.last ? (pageResponse.totalPages - 1) : (pageResponse.number + 1);
  const pageNumbersToShow = Array
    .from({ length: lastPageNumberToShow - firstPageNumberToShow + 1 }, (_, i) => firstPageNumberToShow + i)
    .filter((pageNumber) => pageNumber >= 0 && pageNumber < pageResponse.totalPages);

  const firstItemNumber = pageResponse.number * pageResponse.size + 1;
  const lastItemNumber = Math.min(pageResponse.totalElements, (pageResponse.number + 1) * pageResponse.size);

  return (
    <Container>
      <PageButtonsContainer>
        <PageButton $colorMode={colorMode} onClick={() => onClickPage(0)}>
          <IoIosArrowBack /><IoIosArrowBack />
        </PageButton>
        <PageButton $colorMode={colorMode} onClick={onClickPreviousPage}>
          <IoIosArrowBack />
        </PageButton>
        {pageNumbersToShow.map((pageNumber) => (
          <PageButton key={pageNumber} $colorMode={colorMode} $isActive={pageNumber === pageResponse.number} onClick={() => onClickPage(pageNumber)}>
            <TextStyled $isActive={pageNumber === pageResponse.number}>{pageNumber + 1}</TextStyled>
          </PageButton>
        ))}
        <PageButton $colorMode={colorMode} onClick={onClickNextPage}>
          <IoIosArrowForward />
        </PageButton>
        <PageButton $colorMode={colorMode} onClick={() => onClickPage(pageResponse.totalPages - 1)}>
          <IoIosArrowForward /><IoIosArrowForward />
        </PageButton>
      </PageButtonsContainer>
      <PagesContainer>
        <Text>
          {`${firstItemNumber}–${lastItemNumber} of ${pageResponse.totalElements}`}
        </Text>
        <DropdownContainer>
          <Text>Show</Text>
          <Select
            id="pageSize"
            name="pageSize"
            value={pageResponse.size}
            onChange={(e) => onUpdateSize(Number(e.target.value))}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </Select>

        </DropdownContainer>
      </PagesContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 16px;

    ${mediaBreakpointUp(Breakpoint.TABLET)} {
        flex-direction: row;
    }
`;

const PageButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const PageButton = styled.div<{ $colorMode: ColorMode; $isActive?: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
  padding: 0 10px;
  border: ${({ $colorMode }) => borderStyles($colorMode)};
  border-radius: ${theme.stylesToDelete.borderRadius};
  cursor: pointer;
  background-color: ${({ $isActive, $colorMode }) => ($isActive && theme.colors[$colorMode].background2)};

  &:hover {
    background-color: ${({ $isActive, $colorMode }) => ($isActive ? theme.colors[$colorMode].background2 : theme.colors[$colorMode].background)};
  }
`;

const TextStyled = styled(Text)<{ $isActive?: boolean }>`
  color: ${({ $isActive }) => ($isActive && 'white')};
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const PagesContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;
  align-items: center;
`;

const DropdownContainer = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;
