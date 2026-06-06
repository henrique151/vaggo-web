"use client";

import AccessToken from "@/classes/AccessToken";

export function setToken(data) {
  const token = new AccessToken(data);
  console.log("hello from browser.service!");
  console.log(token);
  localStorage.setItem("token", JSON.stringify(token));
}
