import { api } from "@/lib/axios";

export interface GetPopularProductsResponse {
  product: string;
  amount: number;
}

export async function getPopularProductsApi() {
  const response = await api.get<GetPopularProductsResponse[]>("/metrics/popular-products");
  return response.data;
}
