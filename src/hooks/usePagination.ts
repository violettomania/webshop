export const usePagination = (
  onPageNumberChange: (page: number) => void,
  pageCount: number,
  currentPage: number,
  setPage: (page: number) => void
) => {
  const handlePageNumberChange = (page: number) => {
    onPageNumberChange(page);
    setPage(page);
  };

  const handleNextPage = () => {
    const nextPage = currentPage + 1 > pageCount ? 1 : currentPage + 1;
    onPageNumberChange(nextPage);
    setPage(nextPage);
  };

  const handlePrevPage = () => {
    const prevPage =
      currentPage - 1 < pageCount && currentPage - 1 > 0
        ? currentPage - 1
        : pageCount;
    onPageNumberChange(prevPage);
    setPage(prevPage);
  };

  return {
    handlePageNumberChange,
    handleNextPage,
    handlePrevPage,
  };
};
