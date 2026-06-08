"use client";

import AccessToken from "@/classes/AccessToken";
import { redirect } from "next/navigation";

export function setToken(data) {
  const token = new AccessToken(data);
  console.log("hello from browser.service!");
  console.log(token);
  localStorage.setItem("token", JSON.stringify(token));
}

export function getToken():AccessToken {
  try {
    const token = JSON.parse(localStorage.getItem("token")) as AccessToken
    return token
  } catch (e) {
    // console.warn("Something wrong happened while fetching token. It's better to authenticate again and ensure token is set")
    redirect("/login")
    // throw new Error("Token not found or does not exist.")
  }
}