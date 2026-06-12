import { useState } from "react";
import { useApi } from "../useApi";
import User from "@/classes/user";
import { Image } from "@/classes/data/Image";
import { getToken } from "@/services/user.service";
import { BrowserService } from "@services";

type stateReturnProps = [
  user: User | undefined,
  loading: boolean,
  success: boolean,
];

export function useGetMyUser(): stateReturnProps {
  const token = BrowserService.getToken();
  const [data, success] = useApi({
    uri: `users/${token?.user.id}`,
    dataOnly: true,
    useToken: true,
    req: { method: "GET" },
  });

  const [user, setUser] = useState<User | undefined>(undefined);

  const [loading, setLoading] = useState(false);

  if (data && !loading) {
    // console.log("userDAta:");
    // console.log(data);
    const image = new Image(data.avatarUrl);

    const newuserData = {
      ...data,
      userPicture: image,
    };

    const newUser = new User(newuserData);

    setUser(newUser);
    setLoading(true);
  }

  return [user, loading, success];
}
