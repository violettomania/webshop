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

  // TODO: next:
  // if current page number > 2, insert ... button after 1 and after currentPage
  const displayPageNumbers = () => {
    if (currentPage <= 2 || currentPage <= pageCount - 1) {
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
