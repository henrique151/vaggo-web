import AccessToken from "@/classes/AccessToken";
import request from "./api.service";

//encrypt user token when creating object?
export function getToken(): AccessToken | undefined {
  try {
    let token: AccessToken | string | null = localStorage.getItem("token");
    // console.log("from getTOken");
    // console.log(token);
    if (token != null) {
      token = JSON.parse(token) as AccessToken;
      return token;
    } else {
      console.warn(
        "looks like token doesn't exist or something instead happened, redirecting to login page.",
      );
      // redirect("/login");
    }
  } catch (e) {
    console.error(
      "an error occured while fetching token. check the following message for details:",
    );
    console.log(e);
    // redirect("/login");
  }
}

//checks if user's token is valid by checking it's expiry date. returns true to valid and false to invalid.
export function validateToken() {}

export async function authenticate({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<AccessToken | undefined> {
  const res = await request({
    url: "users/login",
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

  console.log(res);

  if (res.ok) {
    const data = await res.json();
    console.log(data);

    const token = new AccessToken(data.data);

    return token;
  }
  return undefined;
}

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
export async function register(data: registerProps): Promise<any> {
  const body = new FormData();

  for (const [key, value] of Object.entries(data)) {
    console.log([key, value]);
    body.append(key, value);
  }

  const res = await request({
    url: `users`,
    req: {
      method: "POST",
      body: body,
    },
  });

  if (res.ok) {
    const data = await res.json();
    return data;
  }
}
//possible function to redirect user imediatally to login page?
