// app/components/Pagination/Pagination.tsx

'use client';

import css from './Pagination.module.css';
import ReactPaginate from 'react-paginate';

interface PaginationProps {
  readonly page: number;
  readonly totalPages: number;
  readonly onChange: (newPage: number) => void;
}

function Pagination({ page, totalPages, onChange }: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => onChange(selected + 1)}
      forcePage={page - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
    />
  );
}

export default Pagination;