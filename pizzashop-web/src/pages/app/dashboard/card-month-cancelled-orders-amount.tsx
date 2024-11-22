import { getMonthCanceledOrdersAmountApi } from "@/api/get-month-canceled-orders-amount";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { PinOffIcon } from "lucide-react";
import { MetricCardSkeleton } from "./metric-card-skeleton";

export function CardMonthCancelledOrdersAmount() {
  const { data: monthCanceledOrders } = useQuery({
    queryKey: ["metrics", "month-canceled-orders-amount"],
    queryFn: getMonthCanceledOrdersAmountApi,
  });

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Pedidos cancelados (mês)</CardTitle>
        <PinOffIcon className="h-4 w-4 text-muted-foreground text-rose-500 dark:text-rose-400" />
      </CardHeader>
      <CardContent className="space-y-1">
        {monthCanceledOrders ? (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {monthCanceledOrders.amount.toLocaleString("pt-BR")}
            </span>
            <p className="text-sm text-muted-foreground">
              {monthCanceledOrders.diffFromLastMonth < 0 ? (
                <>
                  <span className="text-emerald-500 dark:text-emerald-400">
                    {monthCanceledOrders.diffFromLastMonth * 100}%
                  </span>
                  <span> em relação ao mês anterior</span>
                </>
              ) : (
                <>
                  <span className="text-emerald-500 dark:text-emerald-400">
                    {monthCanceledOrders.diffFromLastMonth * 100}%
                  </span>
                  <span> em relação ao mês anterior</span>
                </>
              )}
            </p>
          </>
        ) : (
          <MetricCardSkeleton />
        )}
      </CardContent>
    </Card>
  );
}
