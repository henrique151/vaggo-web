const API_ADDRESS = process.env.API_ADDRESS || "http://localhost:3000";

type requestProps = { url: string; useToken?: boolean; req: RequestInit };

export default async function request({ url, useToken, req }: requestProps) {
  const res = await fetch(`${API_ADDRESS}/${url}`, req);

  return res;
}
