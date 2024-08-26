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
    <Pagination className='flex justify-center sm:justify-end items-end'>
      <PaginationContent className='gap-3 justify-between'>
        <PaginationItem>
          <PaginationFirst onClick={() => onChangePage(0)} disabled={isFirstPage} className='px-0' />
        </PaginationItem>
        <PaginationItem>
          <PaginationPrevious onClick={goPrevious} disabled={!canPreviousPage} className='px-0' />
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
            <PaginationEllipsis className='p-0' />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext onClick={goNext} disabled={!canNextPage} className='px-0' />
        </PaginationItem>
        <PaginationItem>
          <PaginationLast onClick={() => onChangePage(pageCount - 1)} disabled={isLastPage} className='px-0' />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
