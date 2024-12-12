import { api } from "@/lib/axios";

export interface UpdateProfileRequest {
  name: string;
  description: string;
}

export async function updateProfileApi(profile: UpdateProfileRequest) {
  await api.put("/profile", {
    name: profile.name,
    description: profile.description,
  });
}
