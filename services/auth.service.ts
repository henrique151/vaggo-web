"use server";
// "use client";

// import { cookies } from "next/headers";
import request from "./api.service";
import AccessToken from "@/classes/AccessToken";
import InvalidCredentialsError from "@/classes/errors/api/InvalidCredentialsError";
import { setRefreshToken } from "./cookie.service";

export async function authenticate({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<AccessToken | undefined> {
  // const cookieStore = await cookies();

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

  if (res.status == 401) throw new InvalidCredentialsError();
  // if (res.status == 401) throw new Error("Credenciais inválidas");

  if (res.ok) {
    const cookieHeader = res.headers.getSetCookie();
    setRefreshToken(cookieHeader[0]);
    // cookieStore.set({
    //   name: "refreshToken",
    //   value: cookieHeader[0],
    //   httpOnly: true,
    //   secure: true,
    //   path: "/",
    // });

    const data = await res.json();
    console.log(data);

    // const token = new AccessToken(data.data);

    return data.data;
    // return token;
  }
  return undefined;
}
