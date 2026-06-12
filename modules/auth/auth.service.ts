"use server";
import * as APIService from "../api/api.service";
import { AccessTokenClassInterface } from "@interfaces";

// POST /auth/login
export async function login(email: string, password: string) {}

// POST /auth/register/resend
export async function resendConfirmationCode(email: string) {}

// POST /auth/register/confirm
export async function confirmRegistration(email: string, code: string) {
  const body = JSON.stringify({
    email: email,
    code: code,
  });
  try {
    const res = await APIService.request("auth/register/confirm", {
      body: body,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res;
  } catch (e) {
    console.log(e);
  }
}

// POST /auth/refresh
export async function refreshToken() {}

// POST /auth/forgot-password
export async function forgotPassword(email: string) {}

// POST /auth/forgot-password/confirm
export async function confirmForgotPassword(email: string, code: string) {}

// POST /auth/forgot-password/reset
export async function resetPassword(resetToken: string, password: string) {}

// POST /auth/logout
export async function logout(token: AccessTokenClassInterface) {}
