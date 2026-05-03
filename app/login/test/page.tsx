"use client";
import Header from "@/component/header";
import LoginCard from "@/component/login_card";
import FormCard from "@/component/form_card";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserDAO } from "@/entity/user";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // const handle = async (e: React.SubmitEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   const formData = new FormData(e.currentTarget);
  //   const values = Object.fromEntries(formData) as { email: string; pass: string };

  //   // remove qualquer campo desnecessário
  //   delete (values as any).passConfirm;
  //   // delete values.passConfirm;

  //   try {
  //     const res = await fetch("http://localhost:3000/users/login", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(values),
  //     });

  //     const data = await res.json();

  //     if (res.ok) {
  //       localStorage.setItem("token", data.data.token);
  //       localStorage.setItem("userId", data.data.user.id);
  //       console.log("Login bem-sucedido:", data);
  //       // router.push("/user/dashboard");
  //     } else {
  //       console.error("Erro ao logar:", data);
  //     }
  //   } catch (err) {
  //     console.error("Erro na requisição:", err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const authenticate = async (e:any) => {
  //   e.preventDefault();
  //   setLoading(true)

  //   const formData = new FormData(e.currentTarget);
  //   const values = Object.fromEntries(formData) as { email: string; password: string };

  //   console.log("i'm talking through the code that the page provided.")
  //   let res = await UserDAO.authenticate(values.email, values.password) as {token: string, user: {id: string}} | undefined

  //   if (res) { //user logged in
  //     console.log("you're in.")
  //     localStorage.setItem("token", res.token)
  //     localStorage.setItem("userId", res.user.id)
  //   } else { //api response returned error due to user-error or smth else
  //     console.log("are you dumb for inserting your password or what?")
  //   }
  // }

  const handleAuthenticate = async (res: any) => {
    if (res) {
      //user logged in
      console.log("you're in.");
      // console.log(res)
      localStorage.setItem("token", res.token);
      localStorage.setItem("userId", res.user.id);

      router.push("/user/dashboard");
    } else {
      //api response returned error due to user-error or smth else
      console.log("are you dumb for inserting your password or what?");
    }
  };

  return (
    <main className="flex flex-col min-h-screen">
      <Header />

      <div className="flex flex-1 items-center justify-center bg-[var(--background-soft)] px-4">
        {/* Usando o componente LoginCard */}
        <section
          className={`
          w-full max-w-sm
          rounded-2xl
          px-6 py-8
          shadow-sm
          border
          transition

        `}
        >
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">
              Entrar no Vaggo
            </h1>

            <p className="text-gray-500 text-sm mt-1">Acesse sua conta</p>
          </div>

          {/*  */}
          <FormCard
            endpoint="users/login"
            useToken={false}
            content="json"
            method="POST"
            postSubmit={handleAuthenticate}
          >
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-600">Email</label>

              <input
                type="email"
                name="email"
                required
                placeholder="seu@email.com"
                className="
                px-4 py-3
                rounded-lg
                border border-gray-300
                bg-white/90
                focus:outline-none
                focus:ring-2 focus:ring-gray-300
              "
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-600">Senha</label>

              <input
                type="password"
                name="password"
                required
                placeholder="••••••••"
                className="
                px-4 py-3
                rounded-lg
                border border-gray-300
                bg-white/90
                focus:outline-none
                focus:ring-2 focus:ring-gray-300
              "
              />
            </div>

            <div className="flex justify-between text-sm mt-1">
              <Link href="/register" className="text-gray-600 hover:text-black">
                Criar conta
              </Link>

              <Link href="/template" className="text-gray-600 hover:text-black">
                Esqueci a senha
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="
              mt-4
              py-3
              rounded-lg
              font-medium
              text-white
              bg-gray-900
              hover:bg-black
              transition
              disabled:opacity-60
            "
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </FormCard>
        </section>
      </div>
    </main>
  );
}
