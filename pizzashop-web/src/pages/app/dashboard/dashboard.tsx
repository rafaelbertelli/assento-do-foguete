import { PageTitle } from "@/components/page-title";
import { CardDayOrdersAmount } from "./card-day-orders-amount";
import { CardMonthCancelledOrdersAmount } from "./card-month-cancelled-orders-amount";
import { CardMonthOrdersAmount } from "./card-month-orders-amount";
import { CardMonthRevenue } from "./card-month-revenue";
import { ChartPopularProducts } from "./chart-popular-products";
import { ChartRevenuel } from "./chart-revenue";

export function Dashboard() {
  return (
    <>
      <PageTitle title="Dashboard" />

      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <CardMonthRevenue />
          <CardMonthOrdersAmount />
          <CardDayOrdersAmount />
          <CardMonthCancelledOrdersAmount />
        </div>
      </div>

      <div className="grid grid-cols-9 gap-4">
        <ChartRevenuel />
        <ChartPopularProducts />
      </div>
    </>
  );
}
