export interface PageResponse<T> {
  content: T[]
  pageable: {
    pageNumber: number,
    pageSize: number,
  },
  first: boolean,
  last: boolean,
  totalElements: number,
  totalPages: number,
  size: number,
  number: number,
  numberOfElements: number,
  empty: boolean
}

export enum Sort {
  ASC = 'asc',
  DESC = 'desc',
}





