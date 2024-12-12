import { api } from "@/lib/axios";

export interface GetDailyRevenueInPeriodRequest {
  from?: Date;
  to?: Date;
}

export type GetDailyRevenueInPeriodResponse = {
  date: string;
  receipt: number;
}[];

export async function getDailyRevenueInPeriodApi({
  from,
  to,
}: GetDailyRevenueInPeriodRequest): Promise<GetDailyRevenueInPeriodResponse> {
  const result = await api.get<GetDailyRevenueInPeriodResponse>(
    "/metrics/daily-receipt-in-period",
    {
      params: {
        from,
        to,
      },
    },
  );
  return result.data;
}
