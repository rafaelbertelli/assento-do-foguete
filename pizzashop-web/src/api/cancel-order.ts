import { api } from "@/lib/axios";

export interface CancelOrderRequest {
  orderId: string;
}

export async function cancelOrderApi({ orderId }: CancelOrderRequest) {
  await api.patch(`/orders/${orderId}/cancel`);
}
