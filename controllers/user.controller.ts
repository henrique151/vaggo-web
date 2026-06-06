"use server";

import InvalidCredentialsError from "@/classes/errors/api/InvalidCredentialsError";
import * as auth from "@/services/auth.service";
import { setToken } from "@/services/browser.service";
import * as z from "zod";

// general?
//  -> function receives raw input from form (FormData only?)
//  -> controller process, transforms and validate data based on what has been put, and use that data on services
//  -> controller returns array variables: [success: boolean, errors: ValidationError[]]

// login user
// -> controller validates e-mail and password before sending to auth.service
//    -> e-mail is actually an e-mail?
//    -> password follows the rules of passwords?
// -> if everything passes through tests, sends actual data to auth.service and waits response
// -> if auth.services returns sucessfull with data, get the data it returned and apply AccessToken and other security thingies to browser
// -> else, controller transforms the error the service returned into Validation or other errors.

// register user
// -> controller validates some data, checking if they validate accordingly
//    -> is ID Card num reaches a certain number digits?
//    -> is phone reaches a certain number digits?
//    -> does email follow email naming rules?
//    -> does password follow api's password rules? (or leave this as error?)
// -> if tests are sucessfull, pass to user.service
// -> if user registering is ok, return sucesfull to user
// -> else, check which error the service returned (id num already made? phone already registered?)

export async function authenticate(
  email: string,
  password: string,
): Promise<any> {
  const Credentials = z.object({
    email: z.email("Insira um formato válido para e-mail."),
    // .min(8, "A senha precisa possuir no mínimo 8 caractéres"),

    password: z
      .string()
      .min(8, "A senha precisa possuir no mínimo 8 caractéres"),
  });

  const res = Credentials.safeParse({
    email: email,
    password: password,
  });

  console.log("before validator error");
  if (!res.success) {
    const map = {};
    for (const issue of res.error.issues) {
      map[issue.path[0]] = issue.message;
    }
    // if zod returns ValidationError, map all zod.error.issues to return::{errors:{}}
    return {
      success: false,
      zod: res.error.issues,
      errors: map,
      fields: {
        email: email,
        password: password,
      },
    };
  }
  console.log("outside validator error");
  // validate arguments here
  // if anything passes, proceeds with request
  //  if auth.service returns InvalidCredentialsError, returns global message saying that email or pass invalid
  // else, returns validation error paths
  try {
    console.log(
      "validation complete, requesting service from auth.service ...",
    );
    const token = await auth.authenticate({
      email: email,
      password: password,
    });

    // console.log("from controller");
    // console.log(token);
    // setToken("osokdosdk");
    // localStorage.setItem("token", JSON.stringify(token));
    // console.log("from controller after storage");
    // console.log(token);
    return {
      success: true,
      token: token,
    };
  } catch (e) {
    // console.log("error!");
    console.log(e);
    // console.log(e.message);
    // console.log(e.stack);
    // console.log(e.constructor);
    // if (e instanceof InvalidCredentialsError) {
    //   console.log("Credenciais inválidas!");
    // }
    switch (e.constructor) {
      case InvalidCredentialsError:
        // console.log("Credenciais inválidas de constrctor!");
        // invalid credentials for user
        return {
          success: false,
          error: true,
          errorMessage:
            "E-mail ou senha incorretos. Verifique e tente novamente.",
          fields: {
            email: email,
            password: password,
          },
        };
      // break;
      case Error:
        return {
          success: false,
          error: true,
          errorMessage:
            "Algo aconteceu com o nosso servidor, tente novamente mais tarde. Pedimos desculpas pelo transtorno.",
          field: {
            email: email,
            password: password,
          },
        };
    }
  }
}

export async function register() {
  // auth.register(UserObject)
}
