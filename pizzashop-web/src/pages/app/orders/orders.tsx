import { PageTitle } from "@/components/page-title";
import { Paging } from "@/components/paging";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrderTableFilters } from "./order-table-filters";
import { OrderTableRow } from "./order-table.row";

export function Orders() {
  return (
    <>
      <PageTitle title="Pedidos" />
      <div className="space-y-2.5">
        <OrderTableFilters />

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[64px]"></TableHead>
                <TableHead className="w-[200px]">Identificador</TableHead>
                <TableHead className="w-[180px]">Realizado há</TableHead>
                <TableHead className="w-[140px]">Status</TableHead>
                <TableHead className="">Cliente</TableHead>
                <TableHead className="w-[140px]">Total do pedido</TableHead>
                <TableHead className="w-[120px]"></TableHead>
                <TableHead className="w-[120px]"></TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {Array.from({ length: 10 }).map((_, index) => (
                <OrderTableRow key={index} />
              ))}
            </TableBody>
          </Table>
        </div>

        <Paging pageIndex={0} totalCount={100} perPage={10} />
      </div>
    </>
  );
}
