"use server";

import * as APIService from "@/modules/api/api.service";
import { AccessTokenClassInterface, UserClassInterface } from "@interfaces";
import { FormUtils } from "@utils";
import map from "./mappers/user.service.interface.mapper";

//checks if user's token is valid by checking it's expiry date. returns true to valid and false to invalid.
export async function validateToken() {}

export async function getAll(token: AccessTokenClassInterface) {
  try {
    const res: any[] = await APIService.genericGetRequest(
      token,
      "admin/users",
      map,
    );
    return res;
  } catch (e) {
    console.log(e);
  }
}

export async function get(
  token: AccessTokenClassInterface,
): Promise<UserClassInterface>;
export async function get(
  token: AccessTokenClassInterface,
  id: number,
): Promise<UserClassInterface>;
export async function get(
  token: AccessTokenClassInterface,
  id?: number,
): Promise<UserClassInterface> {
  //gets any user details. your token is for authentication
  const url = `users/${id ?? token.user.id}`;

  // const res = await APIService.request(url, token);
  const res = await APIService.genericGetRequest(token, url, map);
  return res;
  // console.log("hello from user.service");
  // const { data } = await res.json(); // TODO turn sucess schema into parser tool

  // console.log("RawData");
  // console.log(data);

  // const user: UserClassInterface = {
  //   id: data.id,
  //   email: data.email,
  //   avatar: { url: data.avatarUrl },
  //   lastTime: {
  //     login: data.lastLogin,
  //     online: data.lastOnline,
  //   },
  //   permissionLevel: data.permissionLevel,
  //   status: {
  //     blocked: data.isBlocked,
  //     admin: data.isAdmin,
  //   },
  //   person: {
  //     id: data.person.id,
  //     name: data.person.name,
  //     cpf: data.person.cpf,
  //     gender: data.person.gender,
  //     phone: data.person.phone,
  //     date: {
  //       birth: data.person.birthDate,
  //       registration: data.person.registrationDate,
  //     },
  //     status: {
  //       active: data.person.isActive,
  //     },
  //   },
  // };
  // return map(data);
}

export async function edit(
  token: AccessTokenClassInterface,
  id: number,
  form: FormData,
  asAdmin?: boolean,
) {
  try {
    if (asAdmin) {
      const res = await APIService.genericEditRequest(
        token,
        "admin/users",
        id,
        form,
        "json",
      );
      return res;
    }
    const res = await APIService.request(`users/${id}`, token, {
      method: "PUT",
      body: form,
      // headers: { "Content-Type": "multipart/form-data" },
    });

    return res.ok;
    // return await res.json();
  } catch (e) {
    console.log(e);
  }
}

export async function deleteById(
  token: AccessTokenClassInterface,
  id: number,
  asAdmin?: boolean,
) {
  try {
    if (asAdmin) {
      const res = await APIService.genericDeleteRequest(
        token,
        `admin/users`,
        id,
      );
      return res;
    }
    const res = await APIService.genericDeleteRequest(token, `users`, id);
    return res;
  } catch (e) {
    console.log(e);
  }
}
export async function register(form: FormData) {
  // const obj = FormUtils.toObject(form);
  try {
    const res = await APIService.request("users", {
      method: "POST",
      body: form,
    });
    const ok = res.ok;
    const data = await res.json();
    console.log(data);

    return ok;
  } catch (e) {
    console.log(e);
  }
}

export async function countBlocked(token: AccessTokenClassInterface) {
  const data = await APIService.genericGetRequest(
    token,
    "admin/users/blocked/count",
  );
  return data.blocked;
}
