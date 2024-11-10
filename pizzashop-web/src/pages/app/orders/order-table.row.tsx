import { approveOrderApi } from "@/api/approve-order";
import { cancelOrderApi } from "@/api/cancel-order";
import { deliverOrderApi } from "@/api/deliver-order";
import { dispatchOrderApi } from "@/api/dispatch-order";
import { GetOrdersResponse } from "@/api/get-orders";
import { OrderStatus, OrderStatusType } from "@/components/order-status";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { queryClient } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ArrowRight, Search, X } from "lucide-react";
import { useState } from "react";
import { OrderDetails } from "./order-details";

interface OrderTableRowProps {
  order: {
    orderId: string;
    createdAt: string;
    status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
    customerName: string;
    total: number;
  };
}

function updateOrderStatusOnCache(orderId: string, status: OrderStatusType) {
  const orderListCached = queryClient.getQueriesData<GetOrdersResponse>({
    queryKey: ["orders"],
  });

  orderListCached?.forEach(([cacheKey, cacheData]) => {
    if (!cacheData) return;

    queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
      ...cacheData,
      orders: cacheData.orders.map((order) =>
        order.orderId === orderId ? { ...order, status } : order,
      ),
    });
  });
}

export function OrderTableRow({ order }: OrderTableRowProps) {
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const { mutateAsync: cancelOrder, isPending: isCancelingOrder } = useMutation({
    mutationFn: cancelOrderApi,
    async onSuccess(_, { orderId }) {
      updateOrderStatusOnCache(orderId, "canceled");
    },
  });

  const { mutateAsync: approveOrder, isPending: isApprovingOrder } = useMutation({
    mutationFn: approveOrderApi,
    async onSuccess(_, { orderId }) {
      updateOrderStatusOnCache(orderId, "processing");
    },
  });

  const { mutateAsync: dispatchOrder, isPending: isDispatchingOrder } = useMutation({
    mutationFn: dispatchOrderApi,
    async onSuccess(_, { orderId }) {
      updateOrderStatusOnCache(orderId, "delivering");
    },
  });

  const { mutateAsync: deliverOrder, isPending: isDeliveringOrder } = useMutation({
    mutationFn: deliverOrderApi,
    async onSuccess(_, { orderId }) {
      updateOrderStatusOnCache(orderId, "delivered");
    },
  });

  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h-3 w-3" />
              <span className="sr-only">Ver detalhes do pedido</span>
            </Button>
          </DialogTrigger>
          <OrderDetails orderId={order.orderId} open={isDetailOpen} />
        </Dialog>
      </TableCell>

      <TableCell className="font-mono text-xs font-medium">{order.orderId}</TableCell>

      <TableCell className="text-muted-foreground">
        {formatDistanceToNow(order.createdAt, {
          locale: ptBR,
          addSuffix: true,
        })}
      </TableCell>

      <TableCell>
        <div className="flex items-center gap-2">
          <span className="font-medium text-muted-foreground">
            <OrderStatus status={order.status} />
          </span>
        </div>
      </TableCell>

      <TableCell className="font-medium">{order.customerName}</TableCell>

      <TableCell className="font-medium">
        {(order.total / 100).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </TableCell>

      <TableCell>
        {order.status === "pending" && (
          <Button
            variant="outline"
            size="xs"
            disabled={isApprovingOrder}
            onClick={() => approveOrder({ orderId: order.orderId })}
          >
            <ArrowRight className="mr-2 h-3 w-3" />
            Aprovar
          </Button>
        )}

        {order.status === "processing" && (
          <Button
            variant="outline"
            size="xs"
            disabled={isDispatchingOrder}
            onClick={() => dispatchOrder({ orderId: order.orderId })}
          >
            <ArrowRight className="mr-2 h-3 w-3" />
            Em entrega
          </Button>
        )}

        {order.status === "delivering" && (
          <Button
            variant="outline"
            size="xs"
            disabled={isDeliveringOrder}
            onClick={() => deliverOrder({ orderId: order.orderId })}
          >
            <ArrowRight className="mr-2 h-3 w-3" />
            Entregue
          </Button>
        )}
      </TableCell>

      <TableCell>
        <Button
          variant="ghost"
          size="xs"
          disabled={!["pending", "processing"].includes(order.status) || isCancelingOrder}
          onClick={() => cancelOrder({ orderId: order.orderId })}
        >
          <X className="mr-2 h-3 w-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  );
}
