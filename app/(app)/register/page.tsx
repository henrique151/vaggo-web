"use client";
import FormCard, { GenericFormLayout } from "@/component/form_card";
import Header from "@/component/header";
import { register } from "@/services/user.service";
import { authenticate } from "@/services/auth.service";
// import RegisterCard from "@/component/register_card";
// import { UserDAO } from "@/entity/user";
// import { The_Nautigal } from "next/font/google";
import Link from "next/link";
// import Image from "next/image";
import { useRouter, redirect } from "next/navigation";
// import { redirect } from "next/navigation"
import { useEffect, useState } from "react";

export default function Page() {
  //user login page:
  //  - credentials inserted will be validated and see if email and pass matches from api call
  //  - if approved, insert credentials as cookies or somewhere safe, like a token or smth
  //  - make user credential validation function on controller or model side, idk where tf this stays at i forgor
  const router = useRouter();

  const [user, setUser] = useState(null);

  const handleRegister = async (e: any) => {
    e.preventDefault();

    // validar  CPF
    // validar e-mail
    // validar telefone
    // validar senha
    const formData = new FormData(e.currentTarget);
    const values = Object.fromEntries(formData) as {
      name: string;
      cpf: string;
      gender: string;
      phone: string;
      birthDate: string;
      email: string;
      password: string;
      avatarUrl: File;
      passConfirm: string;
    };

    // console.log(values);

    delete values.passConfirm;

    const res = await register(values);
    console.log("result from register");
    console.log(res);

    if (res.data.email) {
      const resLogin = await authenticate({
        email: values.email,
        password: values.password,
      });

      if (resLogin) {
        console.log("you are in!");
        console.log(resLogin);
        localStorage.setItem("token", JSON.stringify(resLogin));
        router.push("/user/dashboard");
      }
    }
  };
  return (
    <main className="min-h-screen bg-gray-50">
      {/*<Header />*/}

      <div className="flex justify-center py-10 px-4">
        <FormCard
          endpoint={""}
          method={"POST"}
          content={"form-data"}
          useToken={false}
          onSubmit={handleRegister}
        >
          <GenericFormLayout
            title={"Criar Conta"}
            subtitle={"Preencha seus dados"}
            backlink={"/something"}
          >
            <input
              name="name"
              placeholder="Nome completo"
              className="input-clean"
            />

            <div className="grid grid-cols-2 gap-3">
              <input name="cpf" placeholder="CPF" className="input-clean" />

              <select defaultValue={"M"} name="gender" className="input-clean">
                <option value="M">Masculino</option>
                <option value="F">Feminino</option>
              </select>
            </div>

            <input type="date" name="birthDate" className="input-clean" />
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              className="input-clean"
            />
            <input
              name="phone"
              placeholder="Telefone"
              className="input-clean"
            />

            <div className="grid grid-cols-2 gap-3">
              <input
                type="password"
                name="password"
                placeholder="Senha"
                className="input-clean"
              />
              <input
                type="password"
                name="passConfirm"
                placeholder="Confirmar"
                className="input-clean"
              />
            </div>

            <input type="file" name="avatarUrl" className="input-clean" />

            <button
              type="submit"
              className="
                mt-4
                py-3
                rounded-lg
                font-medium
                text-white
                bg-gray-900
                hover:bg-black
                transition
              "
            >
              Registrar
            </button>

            {/* Link */}
            <div className="text-center text-sm">
              <Link
                href={"kok"}
                className="text-gray-600 hover:text-black hover:underline"
              >
                Voltar
              </Link>
            </div>
          </GenericFormLayout>
        </FormCard>
        {/*<RegisterCard type="user" onSubmit={handleRegister} />*/}
      </div>
    </main>
  );
}
