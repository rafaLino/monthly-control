import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

type PaginationProps = {
  pageIndex: number;
  pageCount: number;
  canPreviousPage: boolean;
  canNextPage: boolean;
  goPrevious: () => void;
  goNext: () => void;
  onChangePage: (page: number) => void;
};
export default function CustomPagination({
  pageIndex,
  pageCount,
  canNextPage,
  canPreviousPage,
  goNext,
  goPrevious,
  onChangePage,
}: Readonly<PaginationProps>) {
  const currentPage = pageIndex + 1;
  const isLastPage = currentPage === pageCount;
  const isFirstPage = pageIndex === 0;
  const thereIsMorePages = currentPage !== pageCount;
  return (
    <Pagination className='justify-end items-end'>
      <PaginationContent className='gap-3'>
        <PaginationItem>
          <PaginationFirst onClick={() => onChangePage(0)} disabled={isFirstPage} />
        </PaginationItem>
        <PaginationItem>
          <PaginationPrevious onClick={goPrevious} disabled={!canPreviousPage} />
        </PaginationItem>
        {isLastPage && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink isActive={true}>{currentPage}</PaginationLink>
        </PaginationItem>
        {thereIsMorePages && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext onClick={goNext} disabled={!canNextPage} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLast onClick={() => onChangePage(pageCount - 1)} disabled={isLastPage} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
