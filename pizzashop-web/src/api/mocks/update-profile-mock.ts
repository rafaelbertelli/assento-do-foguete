import { http, HttpResponse } from "msw";
import { UpdateProfileRequest } from "../update-profile";

export const updateProfileMock = http.put<never, UpdateProfileRequest>(
  "/profile",
  async ({ request }) => {
    const { name } = await request.json();

    if (name === "Rocket Pizza") {
      return HttpResponse.json(null, { status: 201 });
    }

    return HttpResponse.json(null, { status: 400 });
  },
);
