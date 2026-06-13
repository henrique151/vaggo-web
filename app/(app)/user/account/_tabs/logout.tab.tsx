"use client";
import Tab from "@/classes/TabContainer/Tab";
import TabPage from "@/component/container/TabContainer/TabPage";
import { useEffect } from "react";
import { clearRefreshToken } from "@/services/cookie.service";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem("token");
    clearRefreshToken().then(() => {
      router.push("/login");
    });
  }, [router]);

  return <TabPage label="Sair">Encerrando sessão...</TabPage>;
};

const LogoutTab = new Tab({ default: "Sair", page: "Sair da conta" }, Page);
export default LogoutTab;
