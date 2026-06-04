"use client";
// import Header from "@/component/header";
// import LoginCard from "@/component/login_card";
import FormCard, { GenericFormLayout } from "@/component/form_card";
// import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
// import { useApi } from "@/hooks/api/useApi";
// import { useAuthenticateUser } from "@/hooks/api/user/useAuthenticateUser";
// import { authenticate } from "@/services/auth.service";
import { authenticate } from "@/controllers/user.controller";
import FormItem from "@/component/ui/form/FormItem";
import AccessToken from "@/classes/AccessToken";
import FormContainer from "@/component/container/FormContainer";
// import { UserDAO } from "@/entity/user";

import background from "@/public/vaggoLoginTest.png";
import loginLogo from "@/public/assets/logo/logo_single/v1.png";
import Image from "next/image";
import { useActionState } from "react";
// import InvalidCredentialsError from "@/classes/errors/api/InvalidCredentialsError";

export default function Page() {
  const loading = false;
  // const [loading, setLoading] = useState(false);
  // const [request, setRequest] = useState({});
  // const [data, loaded] = useAuthenticateUser(request);
  const submissionAction = async (prevState, form: FormData) => {
    console.log(form.get("email"));
    console.log(form.get("password"));
    /**
     * {
     *  success: boolean,
     *  message: string,
     *  errors?: {
     *    fieldName: {
     *      type: ValidationError,
     *      message: "Something needs to be like this"
     *    }
     *  },
     *  fields: {
     *    fieldName: fieldValue
     *  }
     * }
     */
    return { message: "hello!", errors: [] };
  };
  const [state, dispacthAction, pending] = useActionState(submissionAction, {
    message: "",
    errors: [],
  });

  const router = useRouter();

  const handleSubmission = async (e: any) => {
    e.preventDefault();
    // console.log("hello!");

    // const formData = new FormData(e.currentTarget);

    // console.log(formData);
    // const res = await authenticate(
    //   formData.get("email") as string,
    //   formData.get("password") as string,
    // );
    // const err = new InvalidCredentialsError();
    // console.log(err.constructor);
    // const res = await authenticate({
    //   email: (formData.get("email") as string) || "",
    //   password: (formData.get("password") as string) || "",
    // });

    // if (res) {
    //   localStorage.setItem("token", JSON.stringify(new AccessToken(res)));
    //   router.push("/user/dashboard");
    // }

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
    <main className="flex flex-col h-screen">
      <div className="flex flex-row h-screen">
        <div className="w-1/2">
          <Image src={background} alt={""} className="h-screen object-cover" />
        </div>
        <div className="w-1/2 surface-elevated p-6 flex flex-col h-full justify-center">
          <div className="w-full flex flex-col items-center">
            <Image
              src={loginLogo}
              alt={""}
              width={86}
              height={86}
              className="object-cover"
            />
          </div>

          <div className="h-8" />

          <h1 className="text-primary text-3xl text-center">
            Bem-vindo ao Vaggo
          </h1>
          <div className="h-6" />
          {/*<FormContainer onSubmit={handleSubmission} action={dispacthAction}>*/}
          <FormContainer action={dispacthAction}>
            <FormItem
              type={"email"}
              label={"Email"}
              name={"email"}
              placeholder={"seu@email.com"}
              value={state?.message || "email"}
            />

            <div className="h-3" />

            <FormItem
              type={"password"}
              label={"Senha"}
              name={"password"}
              placeholder={"••••••••"}
            />

            <button
              type="submit"
              disabled={loading}
              className="
                mt-8
                py-3
                rounded-lg
                font-medium
                text-white
                btn-primary
                btn-hover
                transition
                disabled:opacity-60
                w-full
              "
            >
              {pending ? "Entrando..." : "Entrar"}
            </button>
          </FormContainer>
        </div>
      </div>
      {/*<div className="flex flex-1 items-center justify-center bg-[var(--background-soft)] px-4">
        <Image src={background} alt={""} />
        <FormContainer>
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
        </FormContainer>
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
      </div>*/}
    </main>
  );
}
