"use client";
import FormItem from "@/component/ui/form/FormItem";
import FormContainer from "@/component/container/FormContainer";

import background from "@/public/vaggoLoginTest.png";
import loginLogo from "@/public/assets/logo/logo_single/v1.png";
import Image from "next/image";
import action from "./authentication.action";
import useForm from "@/hooks/useForm";
import Link from "next/dist/client/link";

export default function Page() {
  const [state, dispacthAction, pending] = useForm(action);

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
              alt={"Logo da Vaggo"}
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
              type={"text"}
              label={"Email"}
              name={"email"}
              placeholder={"seu@email.com"}
              controller={state}
            />

            <div className="h-3" />

            <FormItem
              type={"password"}
              label={"Senha"}
              name={"password"}
              placeholder={"••••••••"}
              controller={state}
            />
            <p className="text-rose-400">{state?.error?.message}</p>

            <button
              type="submit"
              disabled={pending}
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
          <div className="mt-6 flex justify-between text-sm">
            <Link
              href="/register"
              className="
              text-muted
              text-link
              transition-colors
    "
            >
              Criar conta
            </Link>

            <Link
              href="/forgot-password"
              className="
              text-muted
              text-link
              transition-colors
    "
            >
              Esqueci minha senha
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
