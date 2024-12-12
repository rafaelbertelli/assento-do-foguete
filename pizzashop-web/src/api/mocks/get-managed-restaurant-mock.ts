import { http, HttpResponse } from "msw";
import { GetManagedRestaurantResponse } from "../get-managed-restaurant";

export const getManagedRestaurantMock = http.get<never, never, GetManagedRestaurantResponse>(
  "/managed-restaurant",
  () => {
    return HttpResponse.json({
      id: "1",
      name: "Smart Pizza",
      createdAt: new Date("2021-07-01T00:00:00.000Z"),
      updatedAt: new Date("2021-07-01T00:00:00.000Z"),
      description: "The best pizza in town",
      managerId: "1",
    });
  },
);
