"use server";

import InvalidCredentialsError from "@/classes/errors/api/InvalidCredentialsError";
import * as auth from "@/services/auth.service";
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
  // validate arguments here
  // if anything passes, proceeds with request
  //  if auth.service returns InvalidCredentialsError, returns global message saying that email or pass invalid
  // else, returns validation error paths
  try {
    console.log(
      "validation complete, requesting service from auth.service ...",
    );
    const token = await auth.authenticate({ email: email, password: password });
    console.log(token);
  } catch (e) {
    // console.log("error!");
    // console.log(e);
    // console.log(e.message);
    // console.log(e.stack);
    // console.log(e.constructor);
    // if (e instanceof InvalidCredentialsError) {
    //   console.log("Credenciais inválidas!");
    // }
    switch (e.constructor) {
      case InvalidCredentialsError:
        console.log("Credenciais inválidas de constrctor!");
        // invalid credentials for user
        break;
    }
  }
}

export async function register() {
  // auth.register(UserObject)
}
