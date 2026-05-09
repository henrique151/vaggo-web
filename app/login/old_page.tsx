'use client'
import Header from "@/component/header";
import LoginCard from "@/component/login_card";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const values = Object.fromEntries(formData) as { email: string; pass: string };

    // remove qualquer campo desnecessário
    delete (values as any).passConfirm;
    // delete values.passConfirm;

    try {
      const res = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("userId", data.data.user.id);
        console.log("Login bem-sucedido:", data);
        router.push("/user/dashboard");
      } else {
        console.error("Erro ao logar:", data);
      }
    } catch (err) {
      console.error("Erro na requisição:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col min-h-screen">
      <Header />

      <div className="flex flex-1 items-center justify-center bg-[var(--background-soft)] px-4">
        {/* Usando o componente LoginCard */}
        <LoginCard
          onSubmit={handle}
          loading={loading}
          hasBlur={true}
        />
      </div>
    </main>
  );
}
