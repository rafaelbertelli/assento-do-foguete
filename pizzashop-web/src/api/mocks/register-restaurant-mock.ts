import { http, HttpResponse } from "msw";
import { RegisterRestaurantRequest } from "../register-restaurant";

export const registerRestaurantMock = http.post<never, RegisterRestaurantRequest>(
  "/restaurants",
  async ({ request }) => {
    const { restaurantName, managerName, phone, email } = await request.json();

    if (restaurantName === "Pizza Shop") {
      return new HttpResponse(null, { status: 201 });
    }

    return new HttpResponse(null, { status: 400 });
  },
);
