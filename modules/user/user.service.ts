"use server";

// import { AccessToken as AccessTokenClassInterface } from "@/modules/browser/browser.class";
import * as APIService from "@/modules/api/api.service";
// import { UserClassInterface } from "@/modules/user/user.interface";
// import { AccessTokenClassInterface as AccessToken } from "../browser/browser.interface";
import { AccessTokenClassInterface, UserClassInterface } from "@interfaces";
import { FormUtils } from "@utils";
// import { keyof } from "zod";
// import { cookies } from "next/headers";

//encrypt user token when creating object?
// export function getToken(): Promise<AccessToken | undefined> {
// export function getToken(): AccessToken | undefined {
//   try {
//     let token: AccessToken | string | null = localStorage.getItem("token");
//     // console.log("from getTOken");
//     // console.log(token);
//     if (token != null) {
//       token = JSON.parse(token) as AccessToken;
//       return token;
//     } else {
//       console.warn(
//         "looks like token doesn't exist or something instead happened, redirecting to login page.",
//       );
//       // redirect("/login");
//     }
//   } catch (e) {
//     console.error(
//       "an error occured while fetching token. check the following message for details:",
//     );
//     console.log(e);
//     // redirect("/login");
//   }
// }

//checks if user's token is valid by checking it's expiry date. returns true to valid and false to invalid.
export async function validateToken() {}

type registerProps = {
  name: string;
  cpf: string;
  gender: string;
  phone: string;
  birthDate: string;
  email: string;
  password: string;
  avatarUrl: File;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// export async function register(data: registerProps): Promise<any> {
//   const body = new FormData();

//   for (const [key, value] of Object.entries(data)) {
//     console.log([key, value]);
//     body.append(key, value);
//   }

//   const res = await request({
//     url: `users`,
//     req: {
//       method: "POST",
//       body: body,
//     },
//   });

//   if (res.ok) {
//     const data = await res.json();
//     return data;
//   }
// }
//possible function to redirect user imediatally to login page?

// export async function editUser(id, formData) {
//   // const body = new FormData();

//   // for (const [key, value] of Object.entries(data)) {
//   //   console.log([key, value]);
//   //   body.append(key, value);
//   // }

//   const res = await request({
//     url: `users/${id}`,
//     req: {
//       method: "PUT",
//       body: formData,
//     },
//   });

//   if (res.ok) {
//     const data = await res.json();
//     return data;
//   }
// }

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

  const res = await APIService.request(url, token);

  // console.log("hello from user.service");
  const { data } = await res.json(); // TODO turn sucess schema into parser tool

  // console.log("RawData");
  // console.log(data);

  const user: UserClassInterface = {
    id: data.id,
    email: data.email,
    avatar: { url: data.avatarUrl },
    lastTime: {
      login: data.lastLogin,
      online: data.lastOnline,
    },
    permissionLevel: data.permissionLevel,
    status: {
      blocked: data.isBlocked,
      admin: data.isAdmin,
    },
    person: {
      id: data.person.id,
      name: data.person.name,
      cpf: data.person.cpf,
      gender: data.person.gender,
      phone: data.person.phone,
      date: {
        birth: data.person.birthDate,
        registration: data.person.registrationDate,
      },
      status: {
        active: data.person.isActive,
      },
    },
  };
  return user;
}

export async function edit(
  token: AccessTokenClassInterface,
  id: number,
  form: FormData,
) {
  try {
    const res = await APIService.request(`users/${id}`, token, {
      method: "PUT",
      body: form,
      // headers: { "Content-Type": "multipart/form-data" },
    });

    return await res.ok;
    // return await res.json();
  } catch (e) {
    console.log(e);
  }
}

export async function deleteById(token: AccessTokenClassInterface, id: number) {
  try {
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
