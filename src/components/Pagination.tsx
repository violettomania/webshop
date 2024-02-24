import { useAppSelector } from '../hooks/reduxHooksWrapper';
import { usePagination } from '../hooks/usePagination';
import { RootState } from '../state/store/store';

interface PaginationProps {
  onPageNumberChange: (page: number) => void;
}

const selectedPageButtonClasses = 'bg-base-300 border-base-300';

export default function Pagination({ onPageNumberChange }: PaginationProps) {
  const pageCount = useAppSelector((state: RootState) => state.paged.pageCount);
  const currentPage = useAppSelector(
    (state: RootState) => state.paged.currentPage
  );

  const { handlePageNumberChange, handleNextPage, handlePrevPage } =
    usePagination(onPageNumberChange, pageCount, currentPage);

  return pageCount > 1 ? (
    <div className='mt-16 flex justify-end'>
      <div className='join'>
        <button
          className='btn btn-xs sm:btn-md join-item'
          onClick={handlePrevPage}
        >
          Prev
        </button>
        {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
          <button
            onClick={() => handlePageNumberChange(page)}
            key={page}
            className={`btn btn-xs sm:btn-md border-none join-item ${
              currentPage === page ? selectedPageButtonClasses : ''
            }`}
          >
            {page}
          </button>
        ))}
        <button
          className='btn btn-xs sm:btn-md join-item'
          onClick={handleNextPage}
        >
          Next
        </button>
      </div>
    </div>
  ) : null;
}
