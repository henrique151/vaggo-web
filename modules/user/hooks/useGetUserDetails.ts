"use client";
import { startTransition, useEffect, useMemo, useState } from "react";
import { User } from "@classes";
import { BrowserService } from "@services";
import { UserController } from "@controllers";
// import { useRouter } from "next/navigation";

export default function useGetUserDetails(
  id?: number,
): [user: User, loaded: boolean, refresh: CallableFunction] {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loaded, setLoaded] = useState<boolean>(false);
  // const router = useRouter();
  // const loadUser = useMemo(() => {
  //   // const load = async () => {
  //   //   const user = new User(
  //   //     await UserController.get(BrowserService.getToken(), id),
  //   //   );
  //   // }
  //   UserController.get(BrowserService.getToken(), id).then((d) => {
  //     return new User(d);
  //   });

  //   // load()
  // }, []);
  async function loadUser() {
    setLoaded(false);
    const user = new User(
      await UserController.get(BrowserService.getToken(), id),
    );
    setUser(user);
    setLoaded(true);
  }

  // startTransition(loadUser);
  useEffect(() => {
    const load = () => {
      // console.log("loading user?");
      loadUser();
    };
    load();
  }, []);

  const refresh = () => {
    // router.refresh();
    loadUser();
    // console.log("refreshing user?");
    console.log(user);
  };

  return [user, loaded, refresh];
}
