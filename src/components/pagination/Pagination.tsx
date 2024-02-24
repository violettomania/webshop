import LongPagination from './LongPagination';
import ShortPagination from './ShortPagination';

interface PaginationProps {
  onPageNumberChange: (page: number) => void;
  pageCount: number;
}

export default function Pagination({
  onPageNumberChange,
  pageCount,
}: PaginationProps) {
  if (pageCount > 20) {
    return (
      <LongPagination
        onPageNumberChange={onPageNumberChange}
        pageCount={pageCount}
      />
    );
  } else {
    return (
      <ShortPagination
        onPageNumberChange={onPageNumberChange}
        pageCount={pageCount}
      />
    );
  }
}
