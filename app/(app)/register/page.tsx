"use client";

import Image from "next/image";
import Link from "next/link";

import background from "@/public/vaggoLoginTest.png";
import loginLogo from "@/public/assets/logo/logo_single/v1.png";

import FormContainer from "@/component/container/FormContainer";
import FormItem from "@/component/ui/form/FormItem";

import action from "./register.action"; // não criado, vai dar erro, mas é só um placeholder
import useForm from "@/hooks/useForm";

export default function Page() {
  const [state, dispatchAction, pending] = useForm(action);

  //   const router = useRouter();
  // const [state, dispatchAction, pending] = useForm(action);

  // const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //
  //   const formData = new FormData(e.currentTarget);
  //
  //   const values = Object.fromEntries(formData) as {
  //     name: string;
  //     cpf: string;
  //     gender: string;
  //     phone: string;
  //     birthDate: string;
  //     email: string;
  //     password: string;
  //     avatarUrl: File;
  //     passConfirm: string;
  //   };
  //
  //   delete values.passConfirm;
  //
  //   const res = await register(values);
  //
  //   if (res.data.email) {
  //     const resLogin = await authenticate({
  //       email: values.email,
  //       password: values.password,
  //     });
  //
  //     if (resLogin) {
  //       localStorage.setItem("token", JSON.stringify(resLogin));
  //       router.push("/user/dashboard");
  //     }
  //   }
  // };
  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden ">
      {/* Background */}
      <Image
        src={background}
        alt="Background"
        fill
        priority
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-xs" />

      {/* Card */}
      <div
        className="
          relative z-10
          w-full max-w-lg
          mx-auto
          surface-elevated
          rounded-4xl
          p-8 md:p-10
          scrollbar-thumb-sky-700 scrollbar-track-sky-100 overflow-auto
          max-h-[90vh]
        "
      >
        {/* Logo */}
        <div className="w-full flex flex-col items-center">
          <Image
            src={loginLogo}
            alt="Logo da Vaggo"
            width={86}
            height={86}
            className="object-cover"
          />
        </div>

        <div className="h-6" />

        <h1 className="text-primary text-3xl text-center">
          Criar Conta
        </h1>

        <div className="h-6" />

        <FormContainer action={dispatchAction}>
          <FormItem
            type="text"
            label="Nome Completo"
            name="name"
            placeholder="João da Silva"
            controller={state}
          />

          <div className="h-3" />

          <div className="grid grid-cols-2 gap-4">
            <FormItem
              type="text"
              label="CPF"
              name="cpf"
              placeholder="000.000.000-00"
              controller={state}
            />

            <div className="flex flex-col gap-2">
              <label className="text-muted text-sm">
                Gênero
              </label>

              <select
                name="gender"
                defaultValue="M"
                className="app-input"
              >
                <option value="M">Masculino</option>
                <option value="F">Feminino</option>
              </select>
            </div>
          </div>

          <div className="h-3" />

          <div className="grid grid-cols-2 gap-4">
            <FormItem
              type="date"
              label="Nascimento"
              name="birthDate"
              controller={state}
            />

            <FormItem
              type="text"
              label="Telefone"
              name="phone"
              placeholder="(11) 99999-9999"
              controller={state}
            />
          </div>

          <div className="h-3" />

          <FormItem
            type="email"
            label="Email"
            name="email"
            placeholder="seu@email.com"
            controller={state}
          />

          <div className="h-3" />

          <div className="grid grid-cols-2 gap-4">
            <FormItem
              type="password"
              label="Senha"
              name="password"
              placeholder="••••••••"
              controller={state}
            />

            <FormItem
              type="password"
              label="Confirmar Senha"
              name="passConfirm"
              placeholder="••••••••"
              controller={state}
            />
          </div>

          <div className="h-3" />

          <div className="flex flex-col gap-2">
            <label className="text-muted text-sm">
              Foto de Perfil
            </label>

            <input
              type="file"
              name="avatarUrl"
              className="app-input"
            />
          </div>

          <p className="text-rose-400">
            {state?.error?.message}
          </p>

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
            {pending
              ? "Criando conta..."
              : "Criar Conta"}
          </button>
        </FormContainer>

        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="
              text-muted
              text-link
              transition-colors
            "
          >
            Já possui uma conta? Entrar
          </Link>
        </div>
      </div>
    </main>
  );
}