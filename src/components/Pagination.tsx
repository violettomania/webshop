import { RootState, useAppDispatch, useAppSelector } from '../store/store';
import { setPage } from '../slices/productsSlice';

interface PaginationProps {
  onPageNumberChange: (page: number) => void;
}

const selectedPageButtonClasses = 'bg-base-300 border-base-300';

export default function Pagination({ onPageNumberChange }: PaginationProps) {
  const dispatch = useAppDispatch();
  const pageCount = useAppSelector((state: RootState) => state.paged.pageCount);
  const currentPage = useAppSelector(
    (state: RootState) => state.paged.currentPage
  );

  const handlePageNumberChange = (event: React.MouseEvent, page: number) => {
    event.preventDefault();
    onPageNumberChange(page);
    dispatch(setPage(page));
  };

  const handleNextPage = (event: React.MouseEvent) => {
    event.preventDefault();
    const nextPage = currentPage + 1 > pageCount ? 1 : currentPage + 1;
    onPageNumberChange(nextPage);
    dispatch(setPage(nextPage));
  };

  const handlePrevPage = (event: React.MouseEvent) => {
    event.preventDefault();
    const prevPage =
      currentPage - 1 < pageCount && currentPage - 1 > 0
        ? currentPage - 1
        : pageCount;
    onPageNumberChange(prevPage);
    dispatch(setPage(prevPage));
  };

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
            onClick={(e) => handlePageNumberChange(e, page)}
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
