import { api } from "@/lib/axios";

export interface DeliverOrderRequest {
  orderId: string;
}

export async function deliverOrderApi({ orderId }: DeliverOrderRequest) {
  const result = await api.patch(`/orders/${orderId}/deliver`);

  return result.data;
}
