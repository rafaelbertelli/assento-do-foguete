import { getOrdersApi } from "@/api/get-orders";
import { PageTitle } from "@/components/page-title";
import { Paging } from "@/components/paging";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";
import { OrderTableFilters } from "./order-table-filters";
import { OrderTableRow } from "./order-table.row";

export function Orders() {
  const [searchParams, setSearchParams] = useSearchParams();

  const orderId = searchParams.get("orderId");
  const customerName = searchParams.get("customerName");
  const status = searchParams.get("status");
  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get("page") ?? 1);

  const { data: result } = useQuery({
    queryKey: ["orders", orderId, customerName, status, pageIndex],
    queryFn: () =>
      getOrdersApi({
        pageIndex,
        orderId: orderId,
        customerName: customerName,
        status: status,
      }),
  });

  function handlePaginate(page: number) {
    setSearchParams((prev) => {
      prev.set("page", `${page + 1}`);
      return prev;
    });
  }

  return (
    <>
      <PageTitle title="Pedidos" />

      <div className="space-y-5">
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
              {result?.orders?.map((order) => (
                <OrderTableRow key={order.orderId} order={order} />
              ))}
            </TableBody>
          </Table>
        </div>

        {result?.meta && (
          <Paging
            pageIndex={result.meta.pageIndex}
            totalCount={result.meta.totalCount}
            perPage={result.meta.perPage}
            onPageChange={handlePaginate}
          />
        )}
      </div>
    </>
  );
}
