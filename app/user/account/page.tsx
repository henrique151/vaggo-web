"use client";

import Header from "@/component/header";
import { useState } from "react";
import Link from "next/link";

// import TabContainer from "@/component/container/TabContainer/tabContainer";
import TabPage from "@/component/container/TabContainer/TabPage";
// import TabSidebar from "@/component/container/TabContainer/tabSidebar";

import EntityItem from "@/component/container/EntityContainer/EntityItem";

import { useGetUserById } from "@/hooks/api/user/useGetUserById";
import { useGetMyVehicles } from "@/hooks/api/vehicles/useGetMyrVehicles";
import { getToken } from "@/services/user.service";
import PageContextProvider from "./page.provider";

export default function Page() {
  const token = getToken();
  const [activeTab, setActiveTab] = useState("Perfil");
  const [isEditing, setIsEditing] = useState(false);
  const [user] = useGetUserById({
    id: token?.id || 1,
  });
  const [vehicles] = useGetMyVehicles();

  const subPages = {
    Perfil: (
      <TabPage label="Perfil">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Meu Perfil</h2>

          <div className="flex items-center gap-3">
            <span
              className={`
                px-3 py-1 rounded-full text-xs font-medium
                ${
                  user?.person.isActive
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }
              `}
            >
              {user?.person.isActive ? "Ativo" : "Inativo"}
            </span>

            <button
              onClick={() => setIsEditing(true)}
              className="
                px-4 py-2
                rounded-xl
                text-sm
                font-medium
                bg-gray-900
                text-white
                hover:bg-black
                transition
                shrink-0
              "
            >
              Editar
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <EntityItem label="Nome" value={user?.person.name || "Usuário"} />
          <EntityItem label="Email" value={user?.email || "email@email.com"} />
          <EntityItem
            label="Telefone"
            value={user?.person.phone || "(11) 12345-5678"}
          />
          <EntityItem
            label="CPF"
            value={user?.person.cpf || "---.---.------"}
          />
          <EntityItem
            label="Nascimento"
            value={user?.person.birthDate || "XX/XX/XXXX"}
          />
          <EntityItem
            label="Último acesso"
            value={
              showLastLoginDetails(user?.lastLogin || new Date(2026)) || "Data"
            }
          />
        </div>
      </TabPage>
    ),

    Veículos: (
      <TabPage label="Veículos">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Meus Veículos</h2>

          <Link
            href="/user/vehicle/register"
            className="px-4 py-2 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-black transition"
          >
            + Novo veículo
          </Link>
        </div>

        <div className="space-y-4">
          {/*{vehicles?.map((vehicle) => {
            return <EntityCard title={""} description={""} />;
          }) || "Vazio"}*/}
        </div>
      </TabPage>
    ),

    Propriedades: (
      <TabPage label="Propriedades">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Minhas Propriedades</h2>

          <Link
            href="/property/register"
            className="px-4 py-2 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-black transition"
          >
            + Nova propriedade
          </Link>
        </div>

        <div className="space-y-4">
          {/*{properties?.map((property) => {
            return <EntityCard title={""} description={""} />;
          }) || "Vazio"}*/}
        </div>
      </TabPage>
    ),

    "Vaga Placeholder": (
      <TabPage label="Vagas">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Minhas Vagas</h2>

          <Link
            href="/spot/register"
            className="px-4 py-2 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-black transition"
          >
            + Nova vaga
          </Link>
        </div>

        <div className="space-y-4">
          {/*{spots?.map((spot) => {
            return <EntityCard key={spot.id} title={""} description={""} />;
          }) || "Vazio"}*/}
          {/* <EntityCard
            type="spot"
            editHref="/spot/register"
            data={{
              size: 2,
              status: "DISPONIVEL",
              identifier: "A-12",
              isCovered: true,
              approvalStatus: "APROVADA",
              allowedVehicles: "Carro",
              operatingHours: "08:00 às 22:00"
            }}
          /> */}
        </div>
      </TabPage>
    ),

    Reservas: (
      <TabPage label="Reservas">
        <h2 className="text-2xl font-semibold mb-6">Minhas Reservas</h2>

        <div className="space-y-4">
          <div className="border border-gray-200 rounded-2xl p-5 bg-white">
            <h3 className="font-semibold">Shopping Interlagos</h3>

            <p className="text-gray-500">20/04/2026 • 08:00 às 18:00</p>
          </div>

          <div className="border border-gray-200 rounded-2xl p-5 bg-white">
            <h3 className="font-semibold">Aeroporto Congonhas</h3>

            <p className="text-gray-500">25/04/2026 • 06:00 às 23:00</p>
          </div>
        </div>
      </TabPage>
    ),
  };

  return (
    <PageContextProvider>
      <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        <Header />

        <section className="max-w-7xl mx-auto px-6 py-10">
          <div className="mb-8">
            <h1 className="text-4xl font-semibold text-gray-900">
              Minha Conta
            </h1>

            <p className="text-gray-500 mt-2">
              Gerencie suas informações e preferências
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <TabSidebar
              subPages={subPages}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />

            <TabContainer subPages={subPages} activeTab={activeTab} />
          </div>
        </section>

        {/* EDIT DO MODAL */}
        {isEditing && (
          <div
            className="
              fixed inset-0
              z-50
              flex items-center justify-center
              bg-black/30
              backdrop-blur-sm
            "
            onClick={() => setIsEditing(false)}
          >
            <div onClick={(e) => e.stopPropagation()}>
              {/*<EditCard
                type="user"
                hasBlur
                defaultValues={{
                  name: user.person.name,
                  // cpf: user.person.cpf,
                  phone: user.person.phone,
                  birthDate: user.person.birthDate,
                  email: user.email,
                }}
                onSubmit={async (e) => {
                  e.preventDefault();

                  const formData = new FormData(e.currentTarget);

                  const updatedUser = {
                    name: formData.get("name"),
                    phone: formData.get("phone"),
                    birthDate: formData.get("birthDate"),
                    email: formData.get("email"),
                  };

                  const res = await api.call(
                    `users/${localStorage.getItem("userId")}`,
                    true,
                    {
                      body: JSON.stringify(updatedUser),
                      method: "PUT",
                      contentType: "json",
                    },
                  );

                  console.log(res);
                  console.log(updatedUser);

                  setIsEditing(false);
                }}
              />*/}
            </div>
          </div>
        )}
      </main>
    </PageContextProvider>
  );
}

function showLastLoginDetails(userLastLogin: Date) {
  return `${userLastLogin.getDate()}/${userLastLogin.getMonth().toString().padStart(2, "0")}/${userLastLogin.getFullYear()} -- ${userLastLogin.getHours()}:${userLastLogin.getMinutes().toString().padStart(2, "0")}`;
}
