import { useAppDispatch, useAppSelector } from '../hooks/reduxHooksWrapper';
import { usePagination } from '../hooks/usePagination';
import { setPage } from '../state/slices/ordersSlice';
import { RootState } from '../state/store/store';

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

  const { handlePageNumberChange, handleNextPage, handlePrevPage } =
    usePagination(onPageNumberChange, pageCount, currentPage, (page) =>
      dispatch(setPage(page))
    );

  const renderNumberButton = (page: number) => (
    <button
      onClick={() => handlePageNumberChange(page)}
      key={page}
      className={`btn btn-xs sm:btn-md border-none join-item ${
        currentPage === page ? selectedPageButtonClasses : ''
      }`}
    >
      {page}
    </button>
  );

  const renderDividerButton = () => (
    <button className='join-item btn btn-xs sm:btn-md'>...</button>
  );

  const displayPageNumbers = () => {
    const firstTwo = [1, 2];
    const lastTwo = [pageCount - 1, pageCount];
    if (currentPage === 1 || currentPage === pageCount) {
      // [1][...][pageCount]
      return (
        <>
          {renderNumberButton(1)}
          {renderDividerButton()}
          {renderNumberButton(pageCount)}
        </>
      );
    }
    if (firstTwo.includes(currentPage)) {
      // [1][2][...][pageCount]
      return (
        <>
          {renderNumberButton(1)}
          {renderNumberButton(2)}
          {renderDividerButton()}
          {renderNumberButton(pageCount)}
        </>
      );
    }
    if (lastTwo.includes(currentPage)) {
      // [1][...][pageCount - 1][pageCount]
      return (
        <>
          {renderNumberButton(1)}
          {renderDividerButton()}
          {renderNumberButton(pageCount - 1)}
          {renderNumberButton(pageCount)}
        </>
      );
    } else {
      // [1][...][currentPage][...][pageCount]
      return (
        <>
          {renderNumberButton(1)}
          {renderDividerButton()}
          {renderNumberButton(currentPage)}
          {renderDividerButton()}
          {renderNumberButton(pageCount)}
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
