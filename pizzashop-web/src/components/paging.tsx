import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "./ui/button";

interface PagingProps {
  pageIndex: number;
  totalCount: number;
  perPage: number;
  onPageChange: (pageIndex: number) => Promise<void> | void;
}

export function Paging({
  pageIndex = 0,
  totalCount = 0,
  perPage,
  onPageChange,
}: PagingProps) {
  const totalPages = Math.ceil(totalCount / perPage) || 1;
  const isLastPage = pageIndex === totalPages - 1;
  const isFirstPage = pageIndex === 0;

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">
        Total de {totalCount} registros
      </span>

      <div className="flex items-center gap-6 lg:gap-8">
        <div className="text-sm font-medium">
          Página {pageIndex + 1} de {totalPages}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            disabled={isFirstPage}
            className="h-8 w-8 cursor-pointer p-0"
            onClick={() => onPageChange(0)}
          >
            <ChevronsLeft />
            <span className="sr-only">Primeira página</span>
          </Button>

          <Button
            variant="secondary"
            disabled={isFirstPage}
            className="h-8 w-8 cursor-pointer p-0"
            onClick={() => onPageChange(pageIndex - 1)}
          >
            <ChevronLeft />
            <span className="sr-only">Página anterior</span>
          </Button>
          <Button
            variant="secondary"
            disabled={isLastPage}
            className="h-8 w-8 cursor-pointer p-0"
            onClick={() => onPageChange(pageIndex + 1)}
          >
            <ChevronRight />
            <span className="sr-only">Próxima página</span>
          </Button>
          <Button
            variant="secondary"
            disabled={isLastPage}
            className="h-8 w-8 cursor-pointer p-0"
            onClick={() => onPageChange(totalPages - 1)}
          >
            <ChevronsRight />
            <span className="sr-only">Última página</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
