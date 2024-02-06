import { useState } from 'react';

interface PaginationProps {
  pageCount: number;
  onPageNumberChange: (e: React.MouseEvent, page: number) => void;
}

const selectedPageButtonClasses = 'bg-base-300 border-base-300';

// TODO: consider moving these to helper functions
export const getPageFromLocalStorage = () => {
  return Number(localStorage.getItem('page'));
};

export const setPageToLocalStorage = (page: number) => {
  localStorage.setItem('page', String(page));
};

export default function Pagination({
  pageCount,
  onPageNumberChange,
}: PaginationProps) {
  const [currentPage, setCurrentPage] = useState(
    getPageFromLocalStorage() || 1
  );

  const handlePageNumberChange = (event: React.MouseEvent, page: number) => {
    onPageNumberChange(event, page);
    setCurrentPage(page);
    setPageToLocalStorage(page);
  };

  const handleNextPage = (event: React.MouseEvent) => {
    event.preventDefault();
    const nextPage = currentPage + 1 > pageCount ? 1 : currentPage + 1;
    onPageNumberChange(event, nextPage);
    setCurrentPage(nextPage);
    setPageToLocalStorage(nextPage);
  };

  const handlePrevPage = (event: React.MouseEvent) => {
    event.preventDefault();
    const prevPage =
      currentPage - 1 < pageCount && currentPage - 1 > 0
        ? currentPage - 1
        : pageCount;
    onPageNumberChange(event, prevPage);
    setCurrentPage(prevPage);
    setPageToLocalStorage(prevPage);
  };

  return (
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
  );
}
