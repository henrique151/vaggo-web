import { redirect } from "next/navigation";
import { getToken } from "./user.service";

const API_ADDRESS = process.env.API_ADDRESS || "http://localhost:3000";

type requestProps = { url: string; useToken?: boolean; req: RequestInit };

export default async function request({ url, useToken, req }: requestProps) {
  // const request;
  // const router = useRouter();
  if (useToken) {
    const token = await getToken();
    if (!token) {
      console.warn(
        "Looks like the token isn't valid, redirecting to login page",
      );
      redirect("/login", "replace");
    }

    const apiHeader: HeadersInit = {
      Authorization: `Bearer ${token.token}`,
    };
    req.headers = Object.assign(apiHeader, req.headers);
  }
  const res = await fetch(`${API_ADDRESS}/${url}`, req);

  if (res.status == 429) redirect("/error/429", "replace");

  if (res.status == 401) redirect("/login", "replace");

  return res;
}
