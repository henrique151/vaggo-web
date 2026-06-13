"use server";

// import ControllerFieldStatus from "@/classes/controller/ControllerFieldStatus";
// import ControllerStatus from "@/classes/controller/ControllerStatus";
import InvalidCredentialsError from "@/classes/errors/api/InvalidCredentialsError";
import * as auth from "@/services/auth.service";
import * as z from "zod";
import UserSchema from "./user.schemas";

import { ControllerStatus } from "@classes";
// import {
//   AccessToken,
//   //   AccessToken as AccessTokenClassInterface,
// } from "@/modules/browser/browser.class";
// import { APIService } from "@/services/api.service";
// import { getUser } from "@/services/user.service";
import * as UserService from "@/modules/user/user.service";

import {
  AccessTokenClassInterface,
  ControllerStatusStructureInterface,
  UserClassInterface,
} from "@interfaces";
import { FormUtils } from "@utils";
import { APIService } from "@services";
// import * as APIService from "@/modules/api/api.service";
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

// get user
// route: view <-> controller <-> service
// -> view (page/hook) requests user data by given id: 1
// -> controller requests data from user.service (<controller> i want to get a user with this id)
// -> service then requests API and process it (<service> k)
//  -> service request api to find user with id 1 (<service> api please get me a user with this id)
//    -> (backend) if API finds user, returns raw data to service (<api> k. here take it)
//  -> with user data, service maps to user object. Sends plain user object to controller (<service> here take it. also i mapped that for u)
// -> controller returns user plain object to controller and marks as sucessfull

// get property (with spots)
// -> view requests property data with spots to controller (<view> i want property #500 with it's spots pls)
// -> controller gets order and sends requests services from property.service (<controller> i will get property #500 and spots)
// -> service talks with api separately and will be sends data accordingly to controller
//  -> with raw data from api, service maps it
// -> with all data scattered around, controller maps data to a schematized layout ()
// -> controller sends data back to view

export async function authenticate(
  email: string,
  password: string,
): Promise<ControllerStatusStructureInterface> {
  const status = ControllerStatus.setup();
  status.setFields({ email: email, password: password });

  // const Credentials = UserSchema.LOGIN_FORM

  const res = UserSchema.LOGIN_FORM.safeParse({
    email: email,
    password: password,
  });

  if (!res.success) {
    // IDEA wrap into function where class itself maps all Zod-related errors and execute it's own methods
    FormUtils.mapZodErrors(status, res);
    // for (const issue of res.error.issues) {
    //   const current = issue.path[0] as string;
    //   status.setFieldError(current, issue.message);
    //   // if (current in status.fields) {
    //   //   status.fields[current].setError(issue.message);
    //   // }
    // }
    // if zod returns ValidationError, map all zod.error.issues to return::{errors:{}}
    // EXPERIMENT turn sucess state functions to return itself as plainObject if those lines below repeats in other files
    status.failed();
    return status.toObject();
  }

  try {
    const token = await auth.authenticate({
      email: email,
      password: password,
    });

    status.successfull(token);

    return status.toObject();
  } catch (e) {
    switch (e.constructor) {
      case InvalidCredentialsError:
        status.failed(
          "E-mail ou senha incorretos. Verifique e tente novamente.",
          { allFields: true },
        );
        return status.toObject();
      case Error:
        status.failed(
          "Algo aconteceu com o nosso servidor, tente novamente mais tarde. Pedimos desculpas pelo transtorno.",
          { allFields: true },
        );
        return status.toObject();
    }
  }
}

export async function register(form: FormData) {
  const status = ControllerStatus.setup(form);

  const res = UserSchema.REGISTER_FORM.safeParse(FormUtils.toObject(form));
  if (!res.success) {
    FormUtils.mapZodErrors(status, res);
    status.failed();
    return status.toObject();
  }
  // validate all data
  //
  // auth.register(UserObject)
  try {
    const res = await UserService.register(form);
    if (res) status.successfull();
  } catch (e) {
    console.log(e);
  } finally {
    return status.toObject();
  }
}

export async function edit(
  token: AccessTokenClassInterface,
  form: FormData,
): Promise<ControllerStatusStructureInterface>;
export async function edit(
  token: AccessTokenClassInterface,
  id: number,
  form: FormData,
): Promise<ControllerStatusStructureInterface>;
export async function edit(
  token: AccessTokenClassInterface,
  id: number,
  form: FormData,
  asAdmin: boolean,
): Promise<ControllerStatusStructureInterface>;
export async function edit(
  token: AccessTokenClassInterface,
  form: FormData,
  asAdmin: boolean,
): Promise<ControllerStatusStructureInterface>;
export async function edit(
  token: AccessTokenClassInterface,
  idOrForm: FormData | number,
  formDataOrOption?: FormData | boolean,
  asAdmin?: boolean,
): Promise<ControllerStatusStructureInterface> {
  const form =
    idOrForm instanceof FormData ? idOrForm : (formDataOrOption as FormData);
  const id = typeof idOrForm === "number" ? idOrForm : Number(form.get("id"));
  const status = ControllerStatus.setup(form);
  const adminOption =
    (asAdmin ?? typeof formDataOrOption === "boolean")
      ? (formDataOrOption as boolean)
      : false;

  if (idOrForm instanceof FormData) form.delete("id");
  // validate data
  console.log("status from controller->edit");
  console.log(status);
  console.log("form from controller->edit");
  console.log(form);
  console.log(FormUtils.toObject(form));

  FormUtils.validateForm(status, UserSchema.EDIT_FORM, form);
  console.log(status);
  if (!status.success) {
    return status.toObject();
  }
  //send to service and await response
  try {
    // console.log("asAdmin");
    // console.log(adminOption);
    const res = await UserService.edit(token, id, form, adminOption);
    // const res = adminOption ? await UserService.edit(token, form, adminOption) : await UserService.edit(token, id, form, adminOption);
    console.log(res);
    // const data = await res.json();
    console.log("hello!");
    console.log(res);
    if (res) status.successfull();

    return status.toObject();
  } catch (e) {
    console.log("heh!");
    console.log(e);
  }

  return status.toObject();
}

/**
 * Gets user's information by giving it's ID, or it's own information by providing it's token.
 * @param token User's Token.
 * @param all? Returns all users
 * @param id User's ID
 * @returns User Object
 */
export async function get(
  token: AccessTokenClassInterface,
): Promise<UserClassInterface>;
export async function get(
  token: AccessTokenClassInterface,
  all: boolean,
): Promise<UserClassInterface[]>;
export async function get(
  token: AccessTokenClassInterface,
  id: number,
): Promise<UserClassInterface>;
export async function get(
  token: AccessTokenClassInterface,
  OneOrAll?: boolean | number,
): Promise<UserClassInterface | UserClassInterface[]> {
  const id = typeof OneOrAll === "number" ? OneOrAll : undefined;
  const all = typeof OneOrAll === "boolean" ? OneOrAll : undefined;

  // const tokenObj = new AccessToken(token);
  // console.log(all);
  const res = all
    ? await UserService.getAll(token)
    : await UserService.get(token, id);

  return res;
}

export async function deleteById(
  token: AccessTokenClassInterface,
  id: number,
  asAdmin?: boolean,
) {
  const status = ControllerStatus.setup();

  try {
    const res = await UserService.deleteById(token, id, asAdmin);
    if (res) status.successfull();
    else status.failed();
    return status.toObject();
  } catch (e) {
    console.log(e);

    status.failed();
    return status.toObject();
  }
}

export async function countBlocked(
  token: AccessTokenClassInterface,
): Promise<number> {
  return await UserService.countBlocked(token);
}
