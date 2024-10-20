import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PinOffIcon } from "lucide-react";

export function CardMonthCancelledOrdersAmount() {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Pedidos cancelados (mês)
        </CardTitle>
        <PinOffIcon className="h-4 w-4 text-muted-foreground text-rose-500 dark:text-rose-400" />
      </CardHeader>
      <CardContent className="space-y-1">
        <span className="text-2xl font-bold tracking-tight">2</span>
        <p className="text-sm text-muted-foreground">
          <span className="text-emerald-500 dark:text-emerald-400">-10%</span>{" "}
          em relação ao mês anterior
        </p>
      </CardContent>
    </Card>
  );
}
