import { api } from "@/lib/axios";

interface GetOrderDetailsRequest {
  orderId: string;
}

interface GetOrderDetailsResponse {
  status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
  id: string;
  createdAt: string;
  totalInCents: number;
  customer: {
    name: string;
    email: string;
    phone: string | null;
  };
  orderItems: {
    id: string;
    priceInCents: number;
    quantity: number;
    product: {
      name: string;
    };
  }[];
}

export async function getOrderDetailsApi({
  orderId,
}: GetOrderDetailsRequest): Promise<GetOrderDetailsResponse> {
  const response = await api.get(`/orders/${orderId}`);
  return response.data;
}
