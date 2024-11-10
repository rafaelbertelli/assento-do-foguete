import { api } from "@/lib/axios";

export interface ApproveOrderRequest {
  orderId: string;
}

export async function approveOrderApi({ orderId }: ApproveOrderRequest) {
  const result = await api.patch(`/orders/${orderId}/approve`);

  return result.data;
}
