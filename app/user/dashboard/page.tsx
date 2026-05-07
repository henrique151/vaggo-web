"use client";

import Header from "@/component/header";
import Link from "next/link";
import { useEffect, useState } from "react";
// import { VehicleResponse } from "@/interface/api/vehicle"
import { User, UserDAO } from "@/entity/user";
import { Vehicle, VehicleDAO } from "@/entity/vehicle";
import Image from "next/image";

function VehicleCard({ raw_data }: { raw_data: Vehicle }) {
  const data: Vehicle = raw_data;

  if (!data) return null;

  return (
    <div
      className="
        bg-white
        border border-gray-200
        rounded-2xl
        shadow-sm
        p-5
        hover:shadow-md
        transition
      "
    >
      <h3 className="text-lg font-semibold text-gray-900">
        {data.brand} {data.model}
      </h3>

      <p className="text-sm text-gray-500 mt-2">Placa: {data.licensePlate}</p>
    </div>
  );
}

export default function Page() {
  // const [carData, setCarData] = useState<Vehicle | undefined>();
  const [carsData, setCarsData] = useState<Vehicle[] | []>([]);
  // const [userData, setUserData] = useState<UserResponse | undefined>()
  const [userData, setUserData] = useState<User | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        // const vehicle = await VehicleDAO.get(1);
        const vehicles = await VehicleDAO.getFromUser();
        // console.log("Below here, vehicles;");
        // console.log(vehicles);

        //began testing with ! expression mark (i guess this one ignores the warning about it. possibly, it's better if wrapping around try-catch for better error management)
        const user = await UserDAO.get(localStorage.getItem("userId")!);

        // setCarData(vehicle);
        setCarsData(vehicles ? vehicles : []);

        setUserData(user);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        <Header />

        <div className="max-w-7xl mx-auto px-6 py-16 text-center text-gray-500">
          Carregando painel...
        </div>
      </main>
    );
  }

  if (!carsData || !userData) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        <Header />

        <div className="max-w-7xl mx-auto px-6 py-16 text-center text-red-500">
          Não foi possível carregar os dados.
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header />

      <section className="max-w-7xl mx-auto px-6 py-10">
        {/* TOPO */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">
          <div className="flex flex-row">
            <Image
              alt="Foto de Perfil do Usuário"
              width={128}
              height={128}
              src={userData.userPicture.url}
              className="mr-6 rounded-4xl"
            />

            <div className="flex-col">
              <h1 className="text-4xl font-semibold text-gray-900">
                Olá, {userData.person.name}!
              </h1>

              <p className="text-gray-500 mt-2 text-lg">
                {(() => {
                  const currentTime = new Date().getHours();
                  if (currentTime >= 0 && currentTime <= 12)
                    return <>Bom dia!</>;
                  else if (currentTime >= 13 && currentTime <= 17)
                    return <>Boa Tarde!</>;
                  else if (currentTime >= 18 && currentTime <= 23)
                    return <>Boa noite!</>;
                  else {
                    return <>Bom dia!</>;
                  }
                })()}
              </p>
            </div>
          </div>

          <Link
            href="/user/vehicle/register"
            className="
              px-6 py-4
              rounded-2xl
              bg-gray-900
              text-white
              font-medium
              hover:bg-black
              transition
              shadow-sm
            "
          >
            Registrar veículo
          </Link>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ESQUERDA */}
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8">
              <h2 className="text-2xl font-semibold mb-6">Próximas reservas</h2>

              <div className="text-gray-500">Nenhuma reserva agendada.</div>
            </section>

            <section className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8">
              <h2 className="text-2xl font-semibold mb-6">
                Reservas anteriores
              </h2>

              <div className="text-gray-500">Histórico aparecerá aqui.</div>
            </section>
          </div>

          {/* DIREITA */}
          <div className="space-y-8">
            <section className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8">
              <h2 className="text-2xl font-semibold mb-6">
                Seu(s) veículo(os)
              </h2>

              {carsData.map((car) => {
                return <VehicleCard key={car.id} raw_data={car} />;
              })}
            </section>

            <section className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8">
              <h2 className="text-2xl font-semibold mb-6">Mensagens</h2>

              <div className="text-gray-500">Nenhuma mensagem recente.</div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}

/*
'use client'
// import Link from "next/link"
// import Image from "next/image";

import Header from "@/component/header"
import Link from "next/link"
import { useEffect, useState } from "react"
import * as api from '@/app/api'
import { VehicleResponse } from "@/interface/api/vehicle"
import { UserResponse } from "@/interface/api/user"

function VehicleCard({raw_data}:any) {
    // const [data, setData] = useState(null)
    const data:VehicleResponse = raw_data
    // setData(raw_data)
    // console.log(data)

    if (data != null)
    return (
        <section>
            <div>
                <p>Veículo: {data.brand} {data.model}</p>
                <p>Placa: {data.licensePlate}</p>
            </div>
        </section>
    )
}

export default function Page() {
    const [carData, setCarData] = useState<VehicleResponse | undefined>(undefined)
    const [userData, setUserData] = useState<UserResponse | undefined>(undefined)

    useEffect(() => {
        try {
            api.call("vehicles/1", true, {dataOnly: true})
            .then(data => setCarData(data as VehicleResponse))

            api.call(users/${localStorage.getItem("userId")}, true, {dataOnly: true})
            .then(data => setUserData(data as UserResponse))
            // .then(data => console.log(data as api.UserResponse))


            // fetch(http://localhost:3000/vehicles/${localStorage.getItem('userId')}, {
            // fetch(http://localhost:3000/vehicles/5, {
            // headers: {
            //     'Authorization': Bearer ${localStorage.getItem('token')},
            //     "Content-Type": "application/json"
            // },
            // })
            // .then((res) => res.json())
            // .then((data) => {
            //     // console.log(data);
            //     setCarData(data.data)
            // })

            // fetch(http://localhost:3000/users/${localStorage.getItem('userId')}, {
            // headers: {
            //     'Authorization': Bearer ${localStorage.getItem('token')},
            //     "Content-Type": "application/json"
            // },
            // })
            // .then((res) => res.json())
            // .then((data) => {
            //     // console.log(data);
            //     setUserData(data.data)
            // })

            // api.fetch('')


        } catch (error) {
            console.log(error)
        }

        // api.fetch('')
    }, [])

    if ((carData != undefined && userData != undefined))
    return (
        <main>

            <Header/>

            <h1>Olá {userData.person.name}!</h1>
            <Link href={"/user/vehicle/register"}>Registrar Veículo</Link>

            <section className="mb-1">
                <h1>Mensagens</h1>
                <div>
                    [Insira uma lista de últimos contatos]
                </div>
            </section>

            <section className="mb-3">
                <h1>Veículos</h1>
                <div>
                    <VehicleCard raw_data={carData}/>
                </div>
            </section>

            <section className="mb-3">
                <h1>Suas próximas reservas</h1>
                <div>
                    [Insira cartões de informações de reservas aqui]
                </div>
            </section>

            <section>
                <h1>Suas reservas anteriores</h1>
                <div>
                    [Insira cartões das últimas reservas com possíveis informações sobre avaliações]
                </div>
            </section>
        </main>
    )
}
*/
