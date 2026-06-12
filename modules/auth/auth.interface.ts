import { DeepPartial } from "@interfaces";

export type AuthCredentialsClassInterface = AuthCredentials;
export type AuthCredentialsStructureInterface = DeepPartial<AuthCredentials>;

export type AuthForgotPasswordClassInterface = AuthForgotPassword;
export type AuthForgotPasswordStructureInterface =
  DeepPartial<AuthForgotPassword>;

export type AuthResetPasswordClassInterface = AuthResetPassword;
export type AuthResetPasswordStructureInterface =
  DeepPartial<AuthResetPassword>;

interface AuthCredentials {
  email: string;
  password: string;
}

interface AuthForgotPassword {
  email: string;
}

interface AuthResetPassword {
  resetToken: string;
  password: string;
}

interface Auth {
  email: string;
  password: string;
  resetToken: string;
}