"use server";
// "use client";

// import { cookies } from "next/headers";
import request from "./api.service";
import AccessToken from "@/classes/AccessToken";
import InvalidCredentialsError from "@/classes/errors/api/InvalidCredentialsError";
import { setRefreshToken } from "./cookie.service";
import { setToken } from "./browser.service";
import BadRequestError from "@/classes/errors/api/BadRequestError";


/**
 * Authenticates User. Throws InvalidCredentialsError if invalid credentials
 * @param email Email
 * @param password Password 
 * @returns AccessToken Object
 */
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

  if (res.status == 400) throw new BadRequestError();
  if (res.status == 401) throw new InvalidCredentialsError();

  if (res.ok) {
    const cookieHeader = res.headers.getSetCookie();

    setRefreshToken(cookieHeader[0]);
    
    console.log("success!");

    const data = await res.json();
    console.log(data);
    return data.data;
  } else {
    throw new Error(
      "Something happened With api, please check output for more information",
    );
  }
  // return undefined;
}

/**
 * Registers a user to the system. 
 * @returns void. A confirmation code will be sent to Whatsapp for phone validation.
 */
export async function register() {

}

/** 
 * Sends confirmation code to API
 * @returns void. User gets registered to platform
 */
export async function sendConfirmationCode(email:string ,code: string) {

}

/**
 * Resends confirmation code for User
 * @param email identifier
 */
export async function resendConfirmationCode(email:string) {

}

/**
 * Refreshes user's token for prolonged access
 * @param cookieToken http auth token
 */
export async function refreshToken(cookieToken: string) {

}

/**
 * Logouts user from website
 */
export async function logout() {

}

/**
 * Requests password reset. A code will be sent to user for confirming authenticity
 * @param email user's email
 */
export async function requestPasswordReset(email:string) {

}

/**
 * sends password reset code to server for confirmation
 * @param email user's email
 */
export async function sendPasswordResetCode(email:string) {

}

/**
 * resets user password to a new one
 * @param resetToken Reset token
 * @param password new password
 */
export async function resetPassword(resetToken: string, password: string) {

}