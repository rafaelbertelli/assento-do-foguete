import { api } from "@/lib/axios";

interface SignInRequest {
  email: string;
}

export async function signInApi({ email }: SignInRequest) {
  await api.post("/authenticate", { email });
}
