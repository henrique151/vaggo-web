import AccessToken from "@/classes/AccessToken";

//encrypt user token when creating object?
export function getToken(): AccessToken | undefined {
  try {
    let token: AccessToken | string | null = localStorage.getItem("token");
    if (token != null) {
      token = JSON.parse(token) as AccessToken;
      return token;
    } else return undefined;
  } catch (e) {
    return undefined;
  }
}

//checks if user's token is valid by checking it's expiry date. returns true to valid and false to invalid.
export function validateToken() {}

//possible function to redirect user imediatally to login page?
