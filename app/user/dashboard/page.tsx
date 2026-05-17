"use client";

import Link from "next/link";
import { MouseEvent, useEffect, useState } from "react";
import Image from "next/image";

import CarouselContainer from "@/component/container/CarouselContainer";
import { EntityCard } from "@/component/container/EntityContainer/EntityCard";
import Header from "@/component/header";

import { useGetUserById } from "@/hooks/api/user/useGetUserById";
import { useUserToken } from "@/hooks/api/user/useUserToken";
import { useSearchProperties } from "@/hooks/api/property/useSearchProperties";
import { useGetMyVehicles } from "@/hooks/api/vehicles/useGetUserVehicles";
import { useGetMyNextBookings } from "@/hooks/api/booking/useGetMyNextBookings";
import { useGetMySolicitations } from "@/hooks/api/booking/useGetMySolicitations";
import PanelContainer from "@/component/container/PanelContainer";
import EntityFrame from "@/component/container/EntityContainer/EntityFrame";
import DefaultEntityFrame from "@/component/frames/DefaultEntityFrame";
import ConfirmationEntityCard from "@/component/cards/ConfirmationEntityCard";
import ConfirmationEntityFrame from "@/component/frames/ConfirmationEntityFrame";
import { changeBookingSolicitationStatus } from "@/services/booking.service";

// function VehicleCard({ raw_data }: { raw_data: Vehicle }) {
//   const data: Vehicle = raw_data;

//   if (!data) return null;

//   return (
//     <div
//       className="
//         bg-white
//         border border-gray-200
//         rounded-2xl
//         shadow-sm
//         p-5
//         hover:shadow-md
//         transition
//       "
//     >
//       <h3 className="text-lg font-semibold text-gray-900">
//         {data.brand} {data.model}
//       </h3>

//       <p className="text-sm text-gray-500 mt-2">Placa: {data.licensePlate}</p>
//     </div>
//   );
// }

// function DashboardTile({
//   title,
//   notFoundMessage,
//   children,
// }: {
//   title: string;
//   notFoundMessage: string;
//   children?: React.ReactNode;
// }) {
//   return (
//     <section className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8">
//       <h2 className="text-2xl font-semibold mb-6">{title}</h2>

//       <section>{children}</section>
//       {/*<div className="text-gray-500">{notFoundMessage}</div>*/}
//     </section>
//   );
// }

// function DashboardEntityCard({
//   title,
//   description = "",
//   className,
//   children,
// }: {
//   title: string;
//   description: string;
//   // className: HTMLAttributes<HTMLElement>.className;
//   className: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <div
//       className={`
//         bg-white
//         border border-gray-200
//         rounded-2xl
//         shadow-sm
//         p-5
//         hover:shadow-md
//         transition
//         ${className}
//       `}
//     >
//       <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
//       <p className="text-sm text-gray-500 mt-2">{description}</p>
//       <section>{children}</section>
//     </div>
//   );
// }

export default function Page() {
  const [token] = useUserToken();
  const [carsData] = useGetMyVehicles();
  const [userData] = useGetUserById({
    id: Number(token?.id),
  });
  const [bookingSolicitations] = useGetMySolicitations();

  const [nextBookings] = useGetMyNextBookings();

  const [nextBookingsCards, setnextBookingsCards] = useState<
    (typeof DashboardEntityCard)[] | undefined
  >([]);

  const [result, resultsLoading] = useSearchProperties({
    address: "São Paulo",
  });

  // const [loading, setLoading] = useState(true);
  //
  // console.log("NextSolicitations");
  // console.log(bookingSolicitations);

  // console.log(result);
  const handleSolicitation = async (
    id: number,
    mode: "approve" | "reject" | "cancel",
  ) => {
    const status = accept ? "approve" : "reject";
    const res = await changeBookingSolicitationStatus(id, mode);

    if (res) {
      // const data = await res.json();
      console.log(
        `This solicitation has been ${status}. The following data is from api`,
      );
      // console.log(data);
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
              src={userData.userPicture.url || "/"}
              className="mr-6 rounded-4xl"
            />

            <div className="flex-col">
              <h1 className="text-4xl font-semibold text-gray-900">
                Olá, {userData.person.name}!
              </h1>

              <p className="text-gray-500 mt-2 text-lg">{GreetUser()}</p>
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
            {/* Paineis de Reservas */}

            {/* Próximas Reservas */}
            <PanelContainer title={"Próximas Reservas"}>
              {nextBookingsCards ? (
                <CarouselContainer title={""} cards={nextBookingsCards} />
              ) : (
                <p>Não há reservas agendadas no momento.</p>
              )}
            </PanelContainer>

            {/* Histórico de Reservas */}
            <PanelContainer title={"Reservas anteriores"}>
              <p>Por enquanto não há reservas no histórico.</p>
            </PanelContainer>

            {/* Solicitações de Reservas */}
            <PanelContainer title={"Solicitações de Reservas"}>
              {bookingSolicitations?.map((booking) => {
                return (
                  <section
                    key={`booking_solicitation_${booking.id}`}
                    id={`booking_solicitation_${booking.id}`}
                  >
                    <ConfirmationEntityFrame
                      title={booking.spot.identifier}
                      description={`Código: ${booking.code} Solicitante: ${booking?.user?.person?.name || "Desconhecido"}`}
                      onConfirm={function (
                        event: MouseEvent<Element, MouseEvent>,
                      ): void {
                        throw new Error("Function not implemented.");
                      }}
                      onCancel={function (
                        event: MouseEvent<Element, MouseEvent>,
                      ): void {
                        throw new Error("Function not implemented.");
                      }}
                    />
                    {/*<DashboardEntityCard
                      key={`booking_solicitation_${booking.id}`}
                      // id={`booking_solicitation_${booking.id}`}
                      title={booking.spot.identifier}
                      description={`Código: ${booking.code} Solicitante: ${booking?.user?.person?.name || "Desconhecido"}`}
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
                    </DashboardEntityCard>*/}
                  </section>
                );
              })}
            </PanelContainer>
          </div>

          {/* DIREITA */}
          <div className="space-y-8">
            <PanelContainer title={"Seu(s) veículo(os)"}>
              {carsData.map((car) => {
                // return <VehicleCard key={car.id} raw_data={car} />;
                return (
                  <EntityFrame key={car.id}>
                    <DefaultEntityFrame
                      title={`${car.brand} ${car.model}`}
                      description={`Placa: ${car.licensePlate}`}
                    />
                  </EntityFrame>
                );
              })}
            </PanelContainer>
            <PanelContainer title={"Mensagens"}>
              <p>Nenhuma mensagem recente</p>
            </PanelContainer>
          </div>
        </div>
      </section>
    </main>
  );
}

function GreetUser() {
  const currentTime = new Date().getHours();
  if (currentTime >= 0 && currentTime <= 12) return <>Bom dia!</>;
  else if (currentTime >= 13 && currentTime <= 17) return <>Boa Tarde!</>;
  else if (currentTime >= 18 && currentTime <= 23) return <>Boa noite!</>;
  else {
    return <>Bom dia!</>;
  }
}

function mapBookingCards(d: any) {}
