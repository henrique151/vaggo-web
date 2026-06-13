"use client";
import { startTransition, useEffect, useMemo, useState } from "react";
import { User } from "@classes";
import { BrowserService } from "@services";
import { UserController } from "@controllers";
import map from "../mappers/user.class.mapper";
// import { useRouter } from "next/navigation";

export default function useGetAllUsers(): [
  user: User[],
  loaded: boolean,
  refresh: CallableFunction,
] {
  const [user, setUser] = useState<User[] | undefined>(undefined);
  const [loaded, setLoaded] = useState<boolean>(false);
  async function loadData() {
    setLoaded(false);
    const data = await UserController.get(BrowserService.getToken(), true);
    const users = data.map(map);
    setUser(users);
    setLoaded(true);
  }

  // startTransition(loadUser);
  useEffect(() => {
    const load = () => {
      // console.log("loading user?");
      loadData();
    };
    load();
  }, []);

  const refresh = () => {
    // router.refresh();
    loadData();
    // console.log("refreshing user?");
    console.log(user);
  };

  return [user, loaded, refresh];
}
