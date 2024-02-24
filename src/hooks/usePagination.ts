import { useAppDispatch } from '../hooks/reduxHooksWrapper';
import { setPage } from '../state/slices/productsSlice';

export const usePagination = (
  onPageNumberChange: (page: number) => void,
  pageCount: number,
  currentPage: number
) => {
  const dispatch = useAppDispatch();

  const handlePageNumberChange = (page: number) => {
    onPageNumberChange(page);
    dispatch(setPage(page));
  };

  const handleNextPage = () => {
    const nextPage = currentPage + 1 > pageCount ? 1 : currentPage + 1;
    onPageNumberChange(nextPage);
    dispatch(setPage(nextPage));
  };

  const handlePrevPage = () => {
    const prevPage =
      currentPage - 1 < pageCount && currentPage - 1 > 0
        ? currentPage - 1
        : pageCount;
    onPageNumberChange(prevPage);
    dispatch(setPage(prevPage));
  };

  return {
    handlePageNumberChange,
    handleNextPage,
    handlePrevPage,
  };
};
