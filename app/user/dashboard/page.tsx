"use client";

import Header from "@/component/header";
import Link from "next/link";
import { HTMLAttributes, useEffect, useState } from "react";
// import { VehicleResponse } from "@/interface/api/vehicle"
import { User, UserDAO, useUser } from "@/entity/user";
import { useUserVehicles, Vehicle, VehicleDAO } from "@/entity/vehicle";
import Image from "next/image";
import {
  // Booking,
  // BookingDAO,
  useFetchNextBookings,
  useFetchPropertySolicitations,
} from "@/entity/booking";
// import SpotCard from "@/component/spot_card";
import CarouselContainer from "@/component/container/CarouselContainer";
import { EntityCard } from "@/component/container/EntityCard";
import { useApi } from "@/entity/useApi";
import { useSearchProperties } from "@/entity/property";

// interface CardCarousel {
//   title: string;
//   // children: React.ReactNode;
//   cards: React.ReactNode[];
// }

// function CardCarousel({ title, cards = [] }: CardCarousel) {
//   const [index, setIndex] = useState(0);

//   const CARD_WIDTH = 260;
//   const GAP = 12;
//   const STEP = CARD_WIDTH + GAP;

//   const visibleCards = 3;
//   const maxIndex = cards.length - visibleCards;

//   const next = () => index < maxIndex && setIndex(index + 1);
//   const prev = () => index > 0 && setIndex(index - 1);

//   // if (!spots) return <></>
//   return (
//     <section className="w-full">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>

//         <div className="flex gap-2">
//           <button
//             onClick={prev}
//             disabled={index === 0}
//             className="
//               w-8 h-8
//               rounded-full
//               bg-white
//               border border-gray-200
//               shadow-sm
//               hover:bg-gray-50
//               disabled:opacity-30
//             "
//           >
//             ‹
//           </button>

//           <button
//             onClick={next}
//             disabled={index === maxIndex}
//             className="
//               w-8 h-8
//               rounded-full
//               bg-white
//               border border-gray-200
//               shadow-sm
//               hover:bg-gray-50
//               disabled:opacity-30
//             "
//           >
//             ›
//           </button>
//         </div>
//       </div>

//       {/* Slides */}
//       <div className="overflow-hidden">
//         <div
//           className="flex gap-3 transition-transform duration-300"
//           style={{
//             transform: `translateX(-${index * STEP}px)`,
//           }}
//         >
//           {cards.map((card) => {
//             return <>{card}</>;
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }

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

function DashboardTile({
  title,
  notFoundMessage,
  children,
}: {
  title: string;
  notFoundMessage: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8">
      <h2 className="text-2xl font-semibold mb-6">{title}</h2>

      <section>{children}</section>
      {/*<div className="text-gray-500">{notFoundMessage}</div>*/}
    </section>
  );
}

function DashboardEntityCard({
  title,
  description = "",
  className,
  children,
}: {
  title: string;
  description: string;
  // className: HTMLAttributes<HTMLElement>.className;
  className: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`
        bg-white
        border border-gray-200
        rounded-2xl
        shadow-sm
        p-5
        hover:shadow-md
        transition
        ${className}
      `}
    >
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-500 mt-2">{description}</p>
      <section>{children}</section>
    </div>
  );
}

export default function Page() {
  const [carsData] = useUserVehicles();
  const [userData] = useUser({
    id: Number(localStorage.getItem("userId")),
  });
  const [bookingSolicitations] = useFetchPropertySolicitations();

  const [nextBookings, setnextBookings] = useFetchNextBookings();

  const [nextBookingsCards, setnextBookingsCards] = useState<
    (typeof DashboardEntityCard)[] | undefined
  >([]);

  const [result, resultsLoading] = useSearchProperties({
    address: "São Paulo",
  });

  // const [loading, setLoading] = useState(true);

  console.log(result);
  const handleSolicitation = async (id: number, accept: boolean) => {
    const status = accept ? "approve" : "reject";
    const res = await fetch(
      `http://localhost:3000/reservations/${id}/${status}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        method: "PATCH",
      },
    );

    if (res.ok) {
      const data = await res.json();
      console.log(
        `This solicitation has been ${status}. The following data is from api`,
      );
      console.log(data);
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (nextBookings) {
      console.log("nextBookings: ");
      console.log(nextBookings);

      const cards = [];
      for (const booking of nextBookings) {
        cards.push(
          <EntityCard
            key={`next_booking_${booking.id}`}
            title={booking.spot.identifier}
            description={`Data: ${booking.datePeriod.start.toLocaleDateString()}, Status: ${booking.status}`}
            redirectTo={""}
          />,
          // <DashboardEntityCard
          //   key={`next_booking_${booking.id}`}
          //   // id={`booking_solicitation_${booking.id}`}
          //   title={booking.spot.identifier}
          //   description={`Data: ${booking.datePeriod.start.toLocaleDateString()}, Status: ${booking.status}`}
          //   className="mb-3"
          // >
          //   <div className="flex flex-row"></div>
          // </DashboardEntityCard>,
        );
      }
      setnextBookingsCards(cards);
    }
  }, [nextBookings]);

  // if (loading) {
  //   return (
  //     <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
  //       <Header />

  //       <div className="max-w-7xl mx-auto px-6 py-16 text-center text-gray-500">
  //         Carregando painel...
  //       </div>
  //     </main>
  //   );
  // }

  const loadCondition = !carsData || !userData || !bookingSolicitations;

  if (loadCondition) {
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
            <DashboardTile
              title={"Próximas Reservas"}
              notFoundMessage={"Nenhuma reserva Agendada"}
            >
              <CarouselContainer title={""} cards={nextBookingsCards} />
              {/*<CardCarousel title={""} cards={nextBookingsCards}></CardCarousel>*/}
              {/*{nextBookings?.map((booking) => {
                return (
                  <section
                    key={`next_booking_${booking.id}`}
                    id={`next_booking_${booking.id}`}
                  >
                    <DashboardEntityCard
                      key={`next_booking_${booking.id}`}
                      // id={`booking_solicitation_${booking.id}`}
                      title={booking.spot.identifier}
                      description={`Data: ${booking.datePeriod.start.toLocaleDateString()}, Status: ${booking.status}`}
                      className="mb-3"
                    >
                      <div className="flex flex-row"></div>
                    </DashboardEntityCard>
                  </section>
                );
              })}*/}
              {/*<p>Nenhuma reserva Agendada</p>*/}
            </DashboardTile>

            <DashboardTile
              title={"Reservas anteriores"}
              notFoundMessage={"Histórico aparecerá aqui."}
            >
              <p>Histórico aparecerá aqui</p>
            </DashboardTile>

            <DashboardTile
              title={"Solicitações de Reservas"}
              notFoundMessage={"Nenhuma mensagem recente."}
            >
              {bookingSolicitations?.map((booking) => {
                return (
                  <section
                    key={`booking_solicitation_${booking.id}`}
                    id={`booking_solicitation_${booking.id}`}
                  >
                    <DashboardEntityCard
                      key={`booking_solicitation_${booking.id}`}
                      // id={`booking_solicitation_${booking.id}`}
                      title={booking.spot.identifier}
                      description={`Solicitante: ${booking.user?.person.name}`}
                      className="mb-3"
                    >
                      <div className="flex flex-row">
                        <button
                          onClick={async (e) => {
                            const res = await handleSolicitation(
                              booking.id,
                              true,
                            );
                            if (res) {
                              console.log("operação executada com sucesso");
                              // BUG element cant get hidden for some reason
                              // if works, delete itself.
                              console.log(
                                document.getElementById(
                                  `booking_solicitation_${booking.id}`,
                                ),
                              );
                              document.getElementById(
                                `booking_solicitation_${booking.id}`,
                              )!.style.visibility = "hidden";
                            }
                          }}
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
                            w-full
                            mr-2
                          "
                        >
                          Aceitar
                        </button>
                        <button
                          onClick={async () => {
                            const res = await handleSolicitation(
                              booking.id,
                              false,
                            );
                            if (res) {
                              console.log("operação executada com sucesso");
                              // BUG element cant get hidden for some reason
                              // if works, delete itself.
                              console.log(
                                document.getElementById(
                                  `booking_solicitation_${booking.id}`,
                                ),
                              );
                              document.getElementById(
                                `booking_solicitation_${booking.id}`,
                              )!.style.visibility = "hidden";
                            }
                          }}
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
                            w-full
                          "
                        >
                          Recusar
                        </button>
                      </div>
                    </DashboardEntityCard>
                  </section>
                );
              })}
              {/*<p>Nenhuma solicitação Recente</p>*/}
            </DashboardTile>

            {/*<section className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8">
              <h2 className="text-2xl font-semibold mb-6">Próximas reservas</h2>

              <div className="text-gray-500">Nenhuma reserva agendada.</div>
            </section>*/}

            {/*<section className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8">
              <h2 className="text-2xl font-semibold mb-6">
                Reservas anteriores
              </h2>

              <div className="text-gray-500">Histórico aparecerá aqui.</div>
            </section>*/}
          </div>

          {/* DIREITA */}
          <div className="space-y-8">
            <DashboardTile
              title={"Seu(s) veículo(os)"}
              notFoundMessage={"Nenhum Veículo Cadastrado"}
            >
              {carsData.map((car) => {
                return <VehicleCard key={car.id} raw_data={car} />;
              })}
            </DashboardTile>
            <DashboardTile
              title={"Mensagens"}
              notFoundMessage={"Nenhuma mensagem recente."}
            >
              <p>Nenhuma mensagem recente</p>
            </DashboardTile>

            {/*<section className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8">
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
            </section>*/}
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
