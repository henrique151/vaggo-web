// import { useState } from "react";
// import { useApi } from "../useApi";
import User from "@/classes/user";
// import { Image } from "@/classes/data/Image";
import AccessToken from "@/classes/AccessToken";
import { useEffect, useState } from "react";
import { get } from "@/controllers/user.controller";
import { getToken } from "@/services/browser.service";

// type stateProps = {
// id: number;
// };

// type stateReturnProps = [
//   user: User | undefined,
//   loading: boolean,
//   success: boolean,
// ];

export default function useGetUserDetails(idOrToken: number | AccessToken) {
  const [user, setUser] = useState<User | undefined>(undefined);
  const id = typeof idOrToken === "number" ? idOrToken : idOrToken.id;
  const token = typeof idOrToken === "object" ? idOrToken : getToken();

  useEffect(() => {
    const load = async () => {
      const res = await get(token, id);
      // setUser(new User(res));
      console.log("from hookDetails");
      console.log(res);
    };

    if (id && token) {
      load();
    }
  }, []);
  // console.log(id);
  // const [data, success] = useApi({
  //   uri: `users/${id}`,
  //   dataOnly: true,
  //   useToken: true,
  //   req: { method: "GET" },
  // });
  // const [user, setUser] = useState<User | undefined>(undefined);
  // const [loading, setLoading] = useState(false);
  // if (data && !loading) {
  //   // console.log("userDAta:");
  //   // console.log(data);
  //   const image = new Image(data.avatarUrl);
  //   const newuserData = {
  //     ...data,
  //     userPicture: image,
  //   };
  //   const newUser = new User(newuserData);
  //   setUser(newUser);
  //   setLoading(true);
  // }
  return [user];
}
