export interface InfPaginationResult<T> {
  list: T[];
  after: string;
  before: string;
}

export interface PaginationResult<T> {
  list: T[];
  page: Pagination[];
  total?: number;
}

export interface Pagination {
  current: boolean;
  num: number;
  text: string;
}
