import { http, HttpResponse } from "msw";
import { GetProfileResponse } from "../get-profile";

export const getProfileMock = http.get<never, never, GetProfileResponse>("/me", () => {
  return HttpResponse.json({
    id: "1",
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "321765721",
    role: "manager",
    createdAt: new Date("2021-07-01T00:00:00.000Z"),
    updatedAt: new Date("2021-07-01T00:00:00.000Z"),
  });
});
