"use server";

import { cookies } from "next/headers";
import request from "./api.service";
import AccessToken from "@/classes/AccessToken";

export async function authenticate({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<AccessToken | undefined> {
  const cookieStore = await cookies();

  console.log("hello from authentication!");
  const res = await request({
    url: "auth/login",
    req: {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    },
  });

  console.log(res);

  if (res.ok) {
    const cookieHeader = res.headers.getSetCookie();
    cookieStore.set({
      name: "refreshToken",
      value: cookieHeader[0],
      httpOnly: true,
      secure: true,
      path: "/",
    });

    const data = await res.json();
    console.log(data);

    // const token = new AccessToken(data.data);

    return data.data;
  }
  return undefined;
}
