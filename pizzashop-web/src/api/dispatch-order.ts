import { api } from "@/lib/axios";

export interface DispatchOrderRequest {
  orderId: string;
}

export async function dispatchOrderApi({ orderId }: DispatchOrderRequest) {
  const result = await api.patch(`/orders/${orderId}/dispatch`);

  return result.data;
}
