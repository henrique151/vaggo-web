"use server";
// "use client";

// import { cookies } from "next/headers";
import request from "./api.service";
import AccessToken from "@/classes/AccessToken";
import InvalidCredentialsError from "@/classes/errors/api/InvalidCredentialsError";
import { setRefreshToken } from "./cookie.service";
import { setToken } from "./browser.service";

export async function authenticate({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<AccessToken> {
  // const cookieStore = await cookies();

  // console.log("hello from authentication!");
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

  // console.log(res);

  if (res.status == 400) throw new Error("E-mail ou senha não inseridos");
  if (res.status == 401) throw new InvalidCredentialsError();

  if (res.ok) {
    const cookieHeader = res.headers.getSetCookie();
    setRefreshToken(cookieHeader[0]);
    console.log("success!");
    // cookieStore.set({
    //   name: "refreshToken",
    //   value: cookieHeader[0],
    //   httpOnly: true,
    //   secure: true,
    //   path: "/",
    // });

    const data = await res.json();
    console.log(data);
    // setToken("data");
    // const token = new AccessToken(data.data);
    // setToken("hello!");
    return data.data;
    console.log("token from auth.service (server)");
    console.log(token);
    return token;
  } else {
    throw new Error(
      "Something happened With api, please check output for more information",
    );
  }
  return undefined;
}
