import { api } from "@/lib/axios";

export interface GetManagedRestaurantResponse {
  id: string;
  name: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  description: string;
  managerId: string | null;
}

export async function getManagedRestaurantApi(): Promise<GetManagedRestaurantResponse> {
  const response = await api.get<GetManagedRestaurantResponse>(
    "/managed-restaurant",
  );

  return response.data;
}
