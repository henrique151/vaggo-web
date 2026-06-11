"use client";

// import Link from "next/link";
import { MouseEventHandler, useEffect, useState } from "react";
import Image from "next/image";

import CarouselContainer from "@/component/container/CarouselContainer";
// import { EntityCard } from "@/component/container/EntityContainer/EntityCard";
// import Header from "@/component/header";

// import { useSearchProperties } from "@/hooks/api/property/useSearchProperties";
// import { useGetMyVehicles } from "@/hooks/api/vehicles/useGetMyrVehicles";
// import { useGetMyNextBookings } from "@/hooks/api/booking/useGetMyNextBookings";
// import { useGetMySolicitations } from "@/hooks/api/booking/useGetMySolicitations";
import PanelContainer from "@/component/container/PanelContainer";
import EntityFrame from "@/component/container/EntityContainer/EntityFrame";
import DefaultEntityFrame from "@/component/frames/DefaultEntityFrame";
// import ConfirmationEntityCard from "@/component/cards/ConfirmationEntityCard";
// import ConfirmationEntityFrame from "@/component/frames/ConfirmationEntityFrame";
// import { changeBookingSolicitationStatus } from "@/services/booking.service";
// import { useGetMyUser } from "@/hooks/api/user/useGetMyUser";
import {
  mapLatestBookingCards,
  mapNextBookingCards,
  mapSolicitationFrames as mapSolicitationFrames,
} from "./components.mapper";
// import PanelLayout from "@/component/layout/PanelLayout";
import { useGetMyChats } from "@/hooks/api/chat/useGetMyChats";
// import { useGetChat } from "@/hooks/api/chat/useGetChat";
import BlurOverlay from "@/component/blur_overlay";
import GenericWindow from "@/component/GenericWindow";
import FormItem from "@/component/ui/form/FormItem";
import { sendReview } from "@/services/review.service";
// import { getToken } from "@/services/browser.service";
// import { VehicleController } from "@/modules/vehicle/vehicle.controller";

import useGetUserDetails from "@/modules/user/hooks/useGetUserDetails";
import useGetReservations from "@/modules/reservation/hooks/useGetReservations";
import useGetVehicleDetails from "@/modules/vehicle/hooks/useGetVehicleDetails";
import useComponentMapper from "@/hooks/useComponentMapper";
// import useGetReviews from "@/modules/review/hooks/useGetReviews";

// import { BrowserService } from "@services";

export default function Page() {
  const [user] = useGetUserDetails();
  const [reservations] = useGetReservations(true);
  // const [reviews] = useGetReviews();

  // const [bookingSolicitations] = useGetMySolicitations();
  const [chats] = useGetMyChats();
  const [vehicles] = useGetVehicleDetails();

  // console.log(test);
  // const [nextBookings] = useGetMyNextBookings();

  // const [nextBookingsCards, setnextBookingsCards] = useState<
  //   React.ReactNode[] | undefined
  // >([]);

  // const [latestBookingsCards, setLatestBookingsCards] = useState<
  //   React.ReactNode[] | undefined
  // >([]);

  const [window, setWindow] = useState(false);
  const [reservationId, setReservationId] = useState(0);

  const nextBookingsCards = useComponentMapper(
    reservations?.filter(
      (booking) =>
        booking.status === "APROVADA" || booking.status === "PENDENTE",
    ),
    mapNextBookingCards,
  );

  const latestBookingsCards = useComponentMapper(
    reservations?.filter((booking) => booking.status === "APROVADA"),
    (d) => {
      return mapLatestBookingCards(d, {
        windowSetter: setWindow,
        reservationSetter: setReservationId,
      });
    },
  );
  // useEffect(() => {
  //   const test = async () => {};
  //   test();
  // }, []);

  // console.log(reviews);

  // useEffect(() => {
  //   if (reservations) {
  //     // const latestBookingCardsList = [...reservations].filter(
  //     //   (booking) => booking.status === "APROVADA",
  //     // );
  //     // setnextBookingsCards(
  //     //   nextBookingCardsList
  //     //     // nextBookings
  //     //     // .filter((booking) => booking.status === "APROVADA" || "PENDENTE")
  //     //     .map(mapNextBookingCards),
  //     // );

  //     // setLatestBookingsCards(
  //     //   // nextBookings
  //     //   latestBookingCardsList
  //     //     // .filter((booking) => booking.status === "RECUSADA" || "PENDENTE")
  //     //     // .filter((booking) => booking.status === "APROVADA")
  //     //     .map((d) => {
  //     //       return mapLatestBookingCards(d, {
  //     //         windowSetter: setWindow,
  //     //         reservationSetter: setReservationId,
  //     //       });
  //     //     }),
  //     // );
  //   }
  // }, [reservations]);

  function ReviewWindow({ onExit }: { onExit: MouseEventHandler }) {
    const [messageState, setMessageState] = useState<boolean | undefined>(
      undefined,
    );

    const handleReview = async (e) => {
      e.preventDefault();
      const currentTarget = e.currentTarget;
      const formData = new FormData(currentTarget);
      const values = Object.fromEntries(formData.entries()) as unknown as {
        reservationId: number;
        rating: number;
        comment: string;
      };

      const res = await sendReview(
        reservationId,
        values.rating,
        values.comment,
      );
      setMessageState(res);
    };
    const messages = {
      true: (
        <p>Sua Avaliação foi enviada! Obrigado por utilizar nosso serviço!</p>
      ),
      false: (
        <p>
          Houve um erro durante o envio da avaliação, tente novamente dentro de
          alguns minutos. Pedimos desculpas pelo transtorno.
        </p>
      ),
      undefined: (
        <form onSubmit={handleReview}>
          <FormItem
            type="select"
            label={"Qual sua avaliação para esta reserva?:"}
            name={"rating"}
            items={[
              { label: "Péssimo", value: String("1") },
              { label: "Ruim", value: String("2") },
              { label: "Regular", value: String("3") },
              { label: "Bom", value: String("4") },
              { label: "Ótimo", value: String("5") },
            ]}
          />

          <div className="h-4" />
          <FormItem
            type="text"
            label="Diga-nos como foi sua experiência. Isto irá ajudar outros usuários a saber mais sobre o local da reserva!"
            name={"comment"}
          />

          <div className="h-4" />

          <button
            type="submit"
            className="w-full py-3 rounded-lg font-medium text-white bg-gray-900 hover:bg-black transition disabled:opacity-60"
          >
            Enviar
          </button>
        </form>
      ),
    };

    return (
      <>
        <BlurOverlay show={true} onClick={() => {}} />
        <GenericWindow title={"Avaliação"} exitButton={true} onExit={onExit}>
          {messages[String(messageState)]}
        </GenericWindow>
      </>
    );
  }

  return (
    <main className="min-h-screen">
      <div className="container-default mt-6 mb-12">
        <section
          className="
          surface-elevated
          max-w-6xl
          mx-auto
          rounded-4xl
          p-8
        "
        >
          {/* TOPO */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">
            <div className="flex flex-row">
              <Image
                alt="Foto de Perfil do Usuário"
                width={128}
                height={128}
                src={
                  user?.avatar.url || "/" /** TODO fallback to default pfp  */
                }
                className="mr-6 rounded-4xl"
              />

              <div className="flex flex-col justify-center">
                <h1 className="text-4xl font-semibold text-primary">
                  Olá, {user?.person.name ?? "Usuário!"}!
                </h1>
                <p className="text-muted mt-2 text-lg">{GreetUser()}</p>
              </div>
            </div>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* ESQUERDA */}
            <div className="lg:col-span-2 space-y-8">
              <PanelContainer title="Próximas Reservas">
                {nextBookingsCards.length > 0 ? (
                  <CarouselContainer title="" cards={nextBookingsCards ?? []} />
                ) : (
                  // <>
                  <p className="text-muted">
                    Não há reservas agendadas no momento.
                  </p>
                )}
              </PanelContainer>

              <PanelContainer title="Reservas anteriores">
                {latestBookingsCards.length > 0 ? (
                  <CarouselContainer title="" cards={latestBookingsCards} />
                ) : (
                  <p className="text-muted">
                    Por enquanto não há reservas no histórico.
                  </p>
                )}
                <p className="text-muted"></p>
              </PanelContainer>

              <PanelContainer title="Solicitações de Reservas">
                {reservations?.length !== 0 ? (
                  reservations?.map(mapSolicitationFrames)
                ) : (
                  <p className="text-muted">Nenhuma Solicitação no momento.</p>
                )}
              </PanelContainer>
            </div>

            {/* DIREITA */}
            <div className="space-y-8">
              <PanelContainer title="Seu(s) veículo(os)">
                {vehicles?.length > 0 ? (
                  vehicles?.map((car) => (
                    <EntityFrame key={car.id}>
                      <DefaultEntityFrame
                        title={`${car.brand} ${car.model}`}
                        description={`Placa: ${car.licensePlate}`}
                      />
                    </EntityFrame>
                  ))
                ) : (
                  <p className="text-muted">
                    Não há veículos cadastrados no momento.
                  </p>
                )}
              </PanelContainer>

              <PanelContainer title="Mensagens">
                {chats.length > 0 ? (
                  chats?.map((chat) => (
                    <section key={chat.id} className="mb-3">
                      <EntityFrame>
                        <DefaultEntityFrame
                          title={`${chat.user.name} - ${chat.subtitle}`}
                          description={
                            chat.lastContent || "Nenhuma mensagem no momento."
                          }
                          redirectTo={`/chat/${chat.id}`}
                        />
                      </EntityFrame>
                    </section>
                  ))
                ) : (
                  <p className="text-muted">Nenhuma mensagem no momento.</p>
                )}
              </PanelContainer>
            </div>
          </div>
        </section>
      </div>
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

// function mapBookingCards(d: any) {}
