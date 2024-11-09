import { api } from "@/lib/axios";

export async function signOutApi() {
  console.log("signOutApi");
  await api.post("/sign-out");
}
