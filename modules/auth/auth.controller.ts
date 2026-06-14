"use server";
import { ControllerStatus } from "@classes";
import { AccessTokenClassInterface } from "@interfaces";
import * as AuthService from "./auth.service";

// POST /auth/login
export async function login(email: string, password: string) {}

// POST /auth/register/resend
export async function resendConfirmationCode(email: string) {
  try {
    const res = await AuthService.resendConfirmationCode(email);
    if (res?.ok) {
      return true;
    }
  } catch (e) {
    console.log(e);
  }
  return false;
}

// POST /auth/register/confirm
export async function confirmRegistration(
  email: string,
  code: string,
): Promise<boolean> {
  try {
    const res = await AuthService.confirmRegistration(email, code);
    if (res?.ok) {
      const data = await res.json();
      console.log(data);
      return data;
    } else {
      return false;
    }
  } catch (e) {
    console.log(e);
    return false;
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
export async function logout(token: AccessTokenClassInterface) {
  try {
    const res = await AuthService.logout(token);
    if (res?.ok) {
      return true;
    }
  } catch (e) {
    console.log(e);
  }
  return false;
}
