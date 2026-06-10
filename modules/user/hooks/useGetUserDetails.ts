"use client";
import { useEffect, useState } from "react";
import { User } from "@classes";
import { BrowserService } from "@services";
import { UserController } from "@controllers";

export default function useGetUserDetails(
  id?: number,
): [user: User, loaded: boolean] {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    const load = async () => {
      const user = new User(
        await UserController.get(BrowserService.getToken(), id),
      );

      setUser(user);
      setLoaded(true);
    };
    load();
  }, []);

  useEffect(() => {
    console.log("property. possibly this migth appear some times");
    console.log(user);
  }, [user]);

  return [user, loaded];
}
