"use server";

import { cookies } from "next/headers";

export async function setRefreshToken(cookie: string) {
  const cookieStore = await cookies();
  cookieStore.set({
    name: "refreshToken",
    value: cookie,
    httpOnly: true,
    secure: true,
    path: "/",
  });
}

export async function clearRefreshToken() {
  const cookieStore = await cookies();
  cookieStore.delete("refreshToken");
}
