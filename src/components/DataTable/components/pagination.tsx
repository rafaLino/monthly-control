import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
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
};
export default function CustomPagination({
  pageIndex,
  pageCount,
  canNextPage,
  canPreviousPage,
  goNext,
  goPrevious,
}: Readonly<PaginationProps>) {
  return (
    <Pagination className='h-24 justify-end items-end'>
      <PaginationContent className='gap-3'>
        <PaginationItem>
          <PaginationPrevious onClick={goPrevious} disabled={!canPreviousPage} />
        </PaginationItem>
        {pageIndex + 1 === pageCount && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink isActive={true}>{pageIndex + 1}</PaginationLink>
        </PaginationItem>
        {pageIndex + 1 !== pageCount && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext onClick={goNext} disabled={!canNextPage} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
