import { api } from "@/lib/axios";

export interface GetOrdersRequest {
  pageIndex: number;
  orderId: string | null;
  customerName: string | null;
  status: string | null;
}

export interface GetOrdersResponse {
  orders: {
    orderId: string;
    createdAt: string;
    status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
    customerName: string;
    total: number;
  }[];
  meta: {
    pageIndex: number;
    perPage: number;
    totalCount: number;
  };
}

export async function getOrdersApi({
  customerName,
  orderId,
  pageIndex,
  status,
}: GetOrdersRequest): Promise<GetOrdersResponse> {
  const response = await api.get<GetOrdersResponse>("/orders", {
    params: {
      customerName,
      orderId,
      pageIndex,
      status: status === "all" ? null : status,
    },
  });
  return response.data;
}
