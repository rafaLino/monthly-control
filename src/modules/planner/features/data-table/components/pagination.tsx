import { Badge } from '@/components/ui/badge';
import {
  Pagination,
  PaginationContent,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';
import { useTranslation } from 'react-i18next';

type PaginationProps = {
  pageIndex: number;
  pageCount: number;
  canPreviousPage: boolean;
  canNextPage: boolean;
  length: number;
  goPrevious: () => void;
  goNext: () => void;
  onChangePage: (page: number) => void;
};
export default function CustomPagination({
  pageIndex,
  pageCount,
  canNextPage,
  canPreviousPage,
  length,
  goNext,
  goPrevious,
  onChangePage
}: Readonly<PaginationProps>) {
  const { t } = useTranslation('translation', { keyPrefix: 'pagination' });
  const currentPage = pageIndex + 1;
  const isLastPage = currentPage === pageCount;
  const isFirstPage = pageIndex === 0;

  return (
    <Pagination className="grid grid-cols-[30px_1fr] justify-between items-center">
      <div>
        <Badge variant="secondary" className="font-mono tabular-nums">
          {length}
        </Badge>
      </div>
      <PaginationContent className="gap-2 justify-start sm:justify-end px-2 sm:px-0 ml-2 sm:ml-0">
        <PaginationItem>
          <PaginationFirst onClick={() => onChangePage(0)} disabled={isFirstPage} className="px-0" />
        </PaginationItem>
        <PaginationItem>
          <PaginationPrevious label={t('previous')} onClick={goPrevious} disabled={!canPreviousPage} className="px-0" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink isActive={true} className="w-6 h-6 rounded-full bg-muted/40">
            {currentPage}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext label={t('next')} onClick={goNext} disabled={!canNextPage} className="px-0" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLast onClick={() => onChangePage(pageCount - 1)} disabled={isLastPage} className="px-0" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
