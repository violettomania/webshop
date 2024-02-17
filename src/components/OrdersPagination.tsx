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

  const displayPageNumbers = () => {
    const firstTwo = [1, 2];
    const lastTwo = [pageCount - 1, pageCount];
    if (currentPage === 1 || currentPage === pageCount) {
      return (
        <>
          <button
            onClick={(e) => handlePageNumberChange(e, 1)}
            key={1}
            className={`btn btn-xs sm:btn-md border-none join-item ${
              currentPage === 1 ? selectedPageButtonClasses : ''
            }`}
          >
            {1}
          </button>
          <button className='join-item btn btn-xs sm:btn-md'>...</button>
          <button
            onClick={(e) => handlePageNumberChange(e, pageCount)}
            key={pageCount}
            className={`btn btn-xs sm:btn-md border-none join-item ${
              currentPage === pageCount ? selectedPageButtonClasses : ''
            }`}
          >
            {pageCount}
          </button>
        </>
      );
    }
    if (firstTwo.includes(currentPage)) {
      // add a loop from 1 to 2 for the first 2 buttons
      return (
        <>
          <button
            onClick={(e) => handlePageNumberChange(e, 1)}
            key={1}
            className={`btn btn-xs sm:btn-md border-none join-item ${
              currentPage === 1 ? selectedPageButtonClasses : ''
            }`}
          >
            {1}
          </button>
          <button
            onClick={(e) => handlePageNumberChange(e, 2)}
            key={2}
            className={`btn btn-xs sm:btn-md border-none join-item ${
              currentPage === 2 ? selectedPageButtonClasses : ''
            }`}
          >
            {2}
          </button>
          <button className='join-item btn btn-xs sm:btn-md'>...</button>
          <button
            onClick={(e) => handlePageNumberChange(e, pageCount)}
            key={pageCount}
            className={`btn btn-xs sm:btn-md border-none join-item ${
              currentPage === pageCount ? selectedPageButtonClasses : ''
            }`}
          >
            {pageCount}
          </button>
        </>
      );
    }
    if (lastTwo.includes(currentPage)) {
      // add a loop from 1 to 2 for the first 2 buttons
      return (
        <>
          <button
            onClick={(e) => handlePageNumberChange(e, 1)}
            key={1}
            className={`btn btn-xs sm:btn-md border-none join-item ${
              currentPage === 1 ? selectedPageButtonClasses : ''
            }`}
          >
            {1}
          </button>
          <button className='join-item btn btn-xs sm:btn-md'>...</button>
          <button
            onClick={(e) => handlePageNumberChange(e, pageCount - 1)}
            key={pageCount - 1}
            className={`btn btn-xs sm:btn-md border-none join-item ${
              currentPage === pageCount ? selectedPageButtonClasses : ''
            }`}
          >
            {pageCount - 1}
          </button>
          <button
            onClick={(e) => handlePageNumberChange(e, pageCount)}
            key={pageCount}
            className={`btn btn-xs sm:btn-md border-none join-item ${
              currentPage === pageCount ? selectedPageButtonClasses : ''
            }`}
          >
            {pageCount}
          </button>
        </>
      );
    } else {
      return (
        <>
          <button
            onClick={(e) => handlePageNumberChange(e, 1)}
            key={1}
            className={`btn btn-xs sm:btn-md border-none join-item ${
              currentPage === 1 ? selectedPageButtonClasses : ''
            }`}
          >
            {1}
          </button>
          <button className='join-item btn btn-xs sm:btn-md'>...</button>
          <button
            onClick={(e) => handlePageNumberChange(e, currentPage)}
            key={currentPage}
            className={`btn btn-xs sm:btn-md border-none join-item ${
              currentPage === 2 ? selectedPageButtonClasses : ''
            }`}
          >
            {currentPage}
          </button>
          <button className='join-item btn btn-xs sm:btn-md'>...</button>
          <button
            onClick={(e) => handlePageNumberChange(e, pageCount)}
            key={pageCount}
            className={`btn btn-xs sm:btn-md border-none join-item ${
              currentPage === pageCount ? selectedPageButtonClasses : ''
            }`}
          >
            {pageCount}
          </button>
        </>
      );
    }
    // TODO: handle the case when currentPage is > 2 or currentPage is < pageCount - 1
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

// {
//   Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
//     <button
//       onClick={(e) => handlePageNumberChange(e, page)}
//       key={page}
//       className={`btn btn-xs sm:btn-md border-none join-item ${
//         currentPage === page ? selectedPageButtonClasses : ''
//       }`}
//     >
//       {page}
//     </button>
//   ));
// }

// {
//   currentPage === 1 || currentPage === pageCount ? (
//     <button className='join-item btn btn-xs sm:btn-md'>...</button>
//   ) : null;
// }
