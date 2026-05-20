"use client";
import Header from "@/component/header";
import LoginCard from "@/component/login_card";
import FormCard, { GenericFormLayout } from "@/component/form_card";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useApi } from "@/hooks/api/useApi";
import { useAuthenticateUser } from "@/hooks/api/user/useAuthenticateUser";
import { authenticate } from "@/services/user.service";
// import { UserDAO } from "@/entity/user";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [request, setRequest] = useState({});
  const [data, loaded] = useAuthenticateUser(request);

  const router = useRouter();

  // const handleAuthenticate = (res: any[]) => {
  //   const [data, loading, success] = res;

  //   if (data) {
  //     //user logged in
  //     console.log("you're in.");
  //     // console.log(res)
  //     localStorage.setItem("token", data.token);
  //     localStorage.setItem("userId", data.user.id);

  //     router.push("/user/dashboard");
  //   } else {
  //     //api response returned error due to user-error or smth else
  //     console.log("are you dumb for inserting your password or what?");
  //   }
  // };

  const handleSubmission = async (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const res = await authenticate({
      email: (formData.get("email") as string) || "",
      password: (formData.get("password") as string) || "",
    });

    if (res) {
      localStorage.setItem("token", JSON.stringify(res));
      router.push("/user/dashboard");
    }

    // setRequest(Object.fromEntries(formData));
  };

  // useEffect(() => {
  //   if (data) {
  //     console.log(data);
  //     localStorage.setItem("token", JSON.stringify(data));
  //     router.push("/user/dashboard");
  //   } else {
  //     console.log("data not loaded into api yet!");
  //   }
  // }, [data]);

  return (
    <main className="flex flex-col min-h-screen">
      <Header />

      <div className="flex flex-1 items-center justify-center bg-[var(--background-soft)] px-4">
        {/* Usando o componente LoginCard */}

        <FormCard
          endpoint="users/login"
          useToken={false}
          content="json"
          method="POST"
          onSubmit={handleSubmission}
          // postSubmit={handleAuthenticate}
        >
          <GenericFormLayout
            title={"Entrar no Vaggo"}
            subtitle={"Acesse sua conta"}
            backlink={""}
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
          </GenericFormLayout>
        </FormCard>

        {/*<section
          className={`
          w-full max-w-sm
          rounded-2xl
          px-6 py-8
          shadow-sm
          border
          transition

        `}
        >*/}
        {/* Header */}
        {/*<div className="text-center mb-6">*/}
        {/*<h1 className="text-2xl font-semibold text-gray-900">*/}
        {/*Entrar no Vaggo*/}
        {/*</h1>*/}

        {/*<p className="text-gray-500 text-sm mt-1">Acesse sua conta</p>*/}
        {/*</div>*/}

        {/*  */}
        {/*</section>*/}
      </div>
    </main>
  );
}
