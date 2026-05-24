"use client";

import Link from "next/link";
import { MouseEvent, MouseEventHandler, useEffect, useState } from "react";
import Image from "next/image";

import CarouselContainer from "@/component/container/CarouselContainer";
import { EntityCard } from "@/component/container/EntityContainer/EntityCard";
import Header from "@/component/header";

// import { useSearchProperties } from "@/hooks/api/property/useSearchProperties";
import { useGetMyVehicles } from "@/hooks/api/vehicles/useGetMyrVehicles";
import { useGetMyNextBookings } from "@/hooks/api/booking/useGetMyNextBookings";
import { useGetMySolicitations } from "@/hooks/api/booking/useGetMySolicitations";
import PanelContainer from "@/component/container/PanelContainer";
import EntityFrame from "@/component/container/EntityContainer/EntityFrame";
import DefaultEntityFrame from "@/component/frames/DefaultEntityFrame";
// import ConfirmationEntityCard from "@/component/cards/ConfirmationEntityCard";
import ConfirmationEntityFrame from "@/component/frames/ConfirmationEntityFrame";
import { changeBookingSolicitationStatus } from "@/services/booking.service";
import { useGetMyUser } from "@/hooks/api/user/useGetMyUser";
import {
  mapLatestBookingCards,
  mapNextBookingCards,
  mapSolicitationFrames as mapSolicitationFrames,
} from "./components.mapper";
import PanelLayout from "@/component/layout/PanelLayout";
import { useGetMyChats } from "@/hooks/api/chat/useGetMyChats";
import { useGetChat } from "@/hooks/api/chat/useGetChat";
import BlurOverlay from "@/component/blur_overlay";
import GenericWindow from "@/component/GenericWindow";
import FormItem from "@/component/ui/form/FormItem";
import { sendReview } from "@/services/review.service";

export default function Page() {
  const [carsData] = useGetMyVehicles();
  const [userData] = useGetMyUser();
  const [bookingSolicitations] = useGetMySolicitations();
  const [chats] = useGetMyChats();
  const [chatTest] = useGetChat(1);

  const [nextBookings] = useGetMyNextBookings();

  const [nextBookingsCards, setnextBookingsCards] = useState<
    React.ReactNode[] | undefined
  >([]);

  const [latestBookingsCards, setLatestBookingsCards] = useState<
    React.ReactNode[] | undefined
  >([]);

  const [window, setWindow] = useState(false);
  const [reservationId, setReservationId] = useState(0);

  // const [result, resultsLoading] = useSearchProperties({
  //   address: "São Paulo",
  // });

  // const [loading, setLoading] = useState(true);
  //
  // console.log("NextSolicitations");
  // console.log(bookingSolicitations);

  console.log("chat with Pedro");
  console.log(chatTest);

  useEffect(() => {
    if (nextBookings) {
      console.log("nextBookings: ");
      console.log(nextBookings);

      setnextBookingsCards(
        nextBookings
          .filter((booking) => booking.status === "APROVADA")
          .map(mapNextBookingCards),
      );

      setLatestBookingsCards(
        nextBookings
          // .filter((booking) => booking.status === "RECUSADA" || "PENDENTE")
          .map((d) => {
            return mapLatestBookingCards(d, {
              windowSetter: setWindow,
              reservationSetter: setReservationId,
            });
          }),
      );
    }
  }, [nextBookings]);

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
              { label: "Péssimo", value: "1" },
              { label: "Ruim", value: "2" },
              { label: "Regular", value: "3" },
              { label: "Bom", value: "4" },
              { label: "Ótimo", value: "5" },
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
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/*<Header />*/}

      <section className="max-w-7xl mx-auto px-6 py-10">
        {/* TOPO */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">
          <div className="flex flex-row">
            <Image
              alt="Foto de Perfil do Usuário"
              width={128}
              height={128}
              src={userData?.userPicture.url || "/"}
              className="mr-6 rounded-4xl"
            />

            <div className="flex-col">
              <h1 className="text-4xl font-semibold text-gray-900">
                Olá, {userData?.person.name}!
              </h1>

              <p className="text-gray-500 mt-2 text-lg">{GreetUser()}</p>
            </div>
          </div>

          {/*<Link
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
          </Link>*/}
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
              {nextBookingsCards ? (
                <CarouselContainer title={""} cards={latestBookingsCards} />
              ) : (
                <p>Não há reservas anteriores no momento.</p>
              )}
              {/*<p>Por enquanto não há reservas no histórico.</p>*/}
              {/*<PanelLayout>oi!</PanelLayout>*/}
            </PanelContainer>

            {/* Solicitações de Reservas */}
            <PanelContainer title={"Solicitações de Reservas"}>
              {/* TODO insert length checker */}
              {bookingSolicitations?.length != 0 ? (
                bookingSolicitations?.map(mapSolicitationFrames)
              ) : (
                <p>Nenhuma Solicitação no momento.</p>
              )}
            </PanelContainer>
          </div>

          {/* DIREITA */}
          <div className="space-y-8">
            <PanelContainer title={"Seu(s) veículo(os)"}>
              {carsData?.map((car) => {
                // return <VehicleCard key={car.id} raw_data={car} />;
                return (
                  <EntityFrame key={car.id}>
                    <DefaultEntityFrame
                      title={`${car.brand} ${car.model}`}
                      description={`Placa: ${car.licensePlate}`}
                    />
                  </EntityFrame>
                );
              }) || "Não há Veículos cadastrado no momento"}
            </PanelContainer>
            <PanelContainer title={"Mensagens"}>
              {chats?.map((chat) => {
                return (
                  <section key={chat.id}>
                    <EntityFrame>
                      <DefaultEntityFrame
                        title={`${chat.user.name} - ${chat.subtitle}`}
                        description={
                          chat.lastContent || "Nenhuma mensagem no momento."
                        }
                        redirectTo={`/chat/${chat.id}`}
                      />
                    </EntityFrame>
                    <div className="h-3" />
                  </section>
                );
              }) || <p>Nenhuma mensagem no momento.</p>}
              {/*<p>Nenhuma mensagem recente</p>*/}
            </PanelContainer>
          </div>
        </div>
      </section>

      {window && (
        <>
          <ReviewWindow onExit={() => setWindow(false)} />
        </>
      )}
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
