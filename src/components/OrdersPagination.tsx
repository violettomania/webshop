import { RootState } from '../state/store/store';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { setPage } from '../state/slices/ordersSlice';

// TODO: merge with Pagination.tsx (HOC?) OR replace the original one with this
// OR switch between them depending on the max number of pages
interface PaginationProps {
  onPageNumberChange: (page: number) => void;
}

const selectedPageButtonClasses = 'bg-base-300 border-base-300';

export default function OrdersPagination({
  onPageNumberChange,
}: PaginationProps) {
  const dispatch = useAppDispatch();
  const pageCount = useAppSelector(
    (state: RootState) => state.orders.pageCount
  );
  const currentPage = useAppSelector(
    (state: RootState) => state.orders.currentPage
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

  // TODO: move to a separate component
  const numberButton = (page: number) => (
    <button
      onClick={(e) => handlePageNumberChange(e, page)}
      key={page}
      className={`btn btn-xs sm:btn-md border-none join-item ${
        currentPage === page ? selectedPageButtonClasses : ''
      }`}
    >
      {page}
    </button>
  );

  // TODO: move to a separate component
  const dividerButton = () => (
    <button className='join-item btn btn-xs sm:btn-md'>...</button>
  );

  const displayPageNumbers = () => {
    const firstTwo = [1, 2];
    const lastTwo = [pageCount - 1, pageCount];
    if (currentPage === 1 || currentPage === pageCount) {
      // [1][...][pageCount]
      return (
        <>
          {numberButton(1)}
          {dividerButton()}
          {numberButton(pageCount)}
        </>
      );
    }
    if (firstTwo.includes(currentPage)) {
      // [1][2][...][pageCount]
      return (
        <>
          {numberButton(1)}
          {numberButton(2)}
          {dividerButton()}
          {numberButton(pageCount)}
        </>
      );
    }
    if (lastTwo.includes(currentPage)) {
      // [1][...][pageCount - 1][pageCount]
      return (
        <>
          {numberButton(1)}
          {dividerButton()}
          {numberButton(pageCount - 1)}
          {numberButton(pageCount)}
        </>
      );
    } else {
      // [1][...][currentPage][...][pageCount]
      return (
        <>
          {numberButton(1)}
          {dividerButton()}
          {numberButton(currentPage)}
          {dividerButton()}
          {numberButton(pageCount)}
        </>
      );
    }
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
        {displayPageNumbers()}
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
