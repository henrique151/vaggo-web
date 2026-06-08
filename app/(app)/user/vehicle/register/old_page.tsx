"use client";
import Header from "@/component/header";
import RegisterCard from "@/component/register_card";
import { The_Nautigal } from "next/font/google";
import Link from "next/link";
// import Image from "next/image";
import { useRouter, redirect } from "next/navigation";
// import { redirect } from "next/navigation"
import { useEffect, useState } from "react";

export default function Page() {
  const handleRegister = (e: any) => {
    e.preventDefault();

    // validar  CPF
    // validar e-mail
    // validar telefone
    // validar senha
    const formData = new FormData(e.currentTarget);
    const values = Object.fromEntries(formData);

    console.log(values);
    let result;

    delete values.passConfirm;

    fetch("http://localhost:3000/vehicles", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));

    //     {
    //   "brand": "Toyota",
    //   "model": "Corolla",
    //   "color": "Prata",
    //   "licensePlate": "ABC1D24",
    //   "manufactureYear": "2022-01-01"
    //     }

    // se resposta da api for 200, loga o usuário com a senha criada pelo forms e leva o usuário para a página dashboard

    // transformar dados registro em JSON

    // enviar JSON pra API ->
    // <- API envia mensagem 200 (message: true, new_id: token)

    // router.push('/user/dashboard')
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/*<Header />*/}

      <div className="flex justify-center py-10 px-4">
        <RegisterCard type="vehicle" onSubmit={handleRegister} />
      </div>
    </main>
  );
}
