import { api } from "@/lib/axios";

interface ManagedRestaurantResponse {
  id: string;
  name: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  description: string | null;
  managerId: string | null;
}

export async function getManagedRestaurantApi(): Promise<ManagedRestaurantResponse> {
  const response = await api.get<ManagedRestaurantResponse>(
    "/managed-restaurant",
  );

  return response.data;
}
