import { api } from "@/lib/axios";

interface GetMonthOrdersAmountResponse {
  amount: number;
  diffFromLastMonth: number;
}

export async function getMonthOrdersAmountApi(): Promise<GetMonthOrdersAmountResponse> {
  const response = await api.get<GetMonthOrdersAmountResponse>("/metrics/month-orders-amount");
  return response.data;
}
