import { useAppDispatch, useAppSelector } from '../hooks/reduxHooksWrapper';
import { usePagination } from '../hooks/usePagination';
import { setPage } from '../state/slices/productsSlice';
import { RootState } from '../state/store/store';

import paginationConfig from './config/paginationConfig';

interface PaginationProps {
  onPageNumberChange: (page: number) => void;
  pageCount: number;
}

export default function ShortPagination({
  onPageNumberChange,
  pageCount,
}: PaginationProps) {
  const dispatch = useAppDispatch();

  const currentPage = useAppSelector(
    (state: RootState) => state.paged.currentPage
  );

  const { handlePageNumberChange, handleNextPage, handlePrevPage } =
    usePagination(onPageNumberChange, pageCount, currentPage, (page) =>
      dispatch(setPage(page))
    );

  return pageCount > 1 ? (
    <div className='mt-16 flex justify-end'>
      <div className='join'>
        <button
          className={paginationConfig.css.otherButtonClasses}
          onClick={handlePrevPage}
        >
          Prev
        </button>
        {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
          <button
            onClick={() => handlePageNumberChange(page)}
            key={page}
            className={`${
              paginationConfig.css.otherButtonClasses
            } border-none ${
              currentPage === page
                ? paginationConfig.css.selectedPageButtonClasses
                : ''
            }`}
          >
            {page}
          </button>
        ))}
        <button
          className={paginationConfig.css.otherButtonClasses}
          onClick={handleNextPage}
        >
          Next
        </button>
      </div>
    </div>
  ) : null;
}
