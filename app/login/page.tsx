"use client";
// import Header from "@/component/header";
// import LoginCard from "@/component/login_card";
import FormCard, { GenericFormLayout } from "@/component/form_card";
// import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
// import { useApi } from "@/hooks/api/useApi";
// import { useAuthenticateUser } from "@/hooks/api/user/useAuthenticateUser";
import { authenticate } from "@/services/auth.service";
import FormItem from "@/component/ui/form/FormItem";
import AccessToken from "@/classes/AccessToken";
// import { UserDAO } from "@/entity/user";

export default function Page() {
  const loading = false;
  // const [loading, setLoading] = useState(false);
  // const [request, setRequest] = useState({});
  // const [data, loaded] = useAuthenticateUser(request);

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
    console.log("hello!");

    const formData = new FormData(e.currentTarget);

    const res = await authenticate({
      email: (formData.get("email") as string) || "",
      password: (formData.get("password") as string) || "",
    });

    if (res) {
      localStorage.setItem("token", JSON.stringify(new AccessToken(res)));
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
      {/*<Header />*/}

      <div className="flex flex-1 items-center justify-center bg-[var(--background-soft)] px-4">
        <FormCard
          endpoint="users/login"
          useToken={false}
          content="json"
          method="POST"
          onSubmit={handleSubmission}
        >
          <GenericFormLayout
            title={"Entrar no Vaggo"}
            subtitle={"Acesse sua conta"}
            backlink={""}
          >
            <FormItem
              type={"email"}
              label={"Email"}
              name={"email"}
              placeholder={"seu@email.com"}
            />

            <FormItem
              type={"password"}
              label={"Senha"}
              name={"password"}
              placeholder={"••••••••"}
            />

            {/*<FormItem
              type={"password"}
              label={"Senha"}
              name={"password"}
              placeholder={"••••••••"}
            />*/}

            <div className="flex justify-between text-sm mt-1">
              <Link href="/register" className="text-muted hover:text-sky-600">
                Criar conta
              </Link>

              <Link href="/template" className="text-muted hover:text-sky-600">
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
                btn-primary
                btn-hover
                transition
                disabled:opacity-60
              "
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </GenericFormLayout>
        </FormCard>
      </div>
    </main>
  );
}
