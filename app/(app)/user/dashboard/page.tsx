"use client";

// import Link from "next/link";
import { MouseEventHandler, useState } from "react";
import Image from "next/image";

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
import { mapSolicitationFrames } from "./components.mapper";
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
import ReservationCarousel from "./ReservationCarousel";
// import useGetReviews from "@/modules/review/hooks/useGetReviews";

// import { BrowserService } from "@services";

export default function Page() {
  const [user]              = useGetUserDetails();
  const [ownerReservations] = useGetReservations(true); // recebidas como proprietário
  const [myReservations]    = useGetReservations();     // feitas como locatário

  const [chats]    = useGetMyChats();
  const [vehicles] = useGetVehicleDetails();

  const [reviewOpen,     setReviewOpen]     = useState(false);
  const [reservationId,  setReservationId]  = useState(0);

  const nextOwnerReservations   = ownerReservations?.filter(
    (b) => b.status === "APROVADA" || b.status === "PENDENTE",
  ) ?? [];
  const latestOwnerReservations = ownerReservations?.filter(
    (b) => b.status === "APROVADA",
  ) ?? [];

  const hasOwnerData =
    ownerReservations !== undefined && ownerReservations.length > 0;

  function ReviewWindow({ onExit }: { onExit: MouseEventHandler }) {
    const [messageState, setMessageState] = useState<boolean | undefined>(undefined);

    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const values = Object.fromEntries(formData.entries()) as unknown as {
        reservationId: number;
        rating: number;
        comment: string;
      };
      const res = await sendReview(reservationId, values.rating, values.comment);
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
        <form onSubmit={handleSubmit}>
          <FormItem
            type="select"
            label={"Qual sua avaliação para esta reserva?:"}
            name={"rating"}
            items={[
              { label: "Péssimo", value: String("1") },
              { label: "Ruim",    value: String("2") },
              { label: "Regular", value: String("3") },
              { label: "Bom",     value: String("4") },
              { label: "Ótimo",   value: String("5") },
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
        <section className="surface-elevated max-w-6xl mx-auto rounded-4xl p-8">

          {/* ── TOPO ── */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 mb-10 pb-8 border-b border-soft">
            <Image
              alt="Foto de Perfil do Usuário"
              width={88}
              height={88}
              src={user?.avatar.url || "/" /** TODO fallback to default pfp */}
              className="rounded-3xl shrink-0 object-cover"
            />
            <div>
              <p className="text-xs font-medium text-subtle uppercase tracking-widest mb-1">
                <GreetUser />
              </p>
              <h1 className="text-3xl font-semibold text-primary leading-tight">
                {user?.person.name ?? "Usuário"}
              </h1>
              <p className="text-sm text-muted mt-1">{user?.email}</p>
            </div>
          </div>

          {/* ── GRID ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* ESQUERDA */}
            <div className="lg:col-span-2 space-y-6">

              <PanelContainer title="Minhas Reservas">
                {myReservations && myReservations.length > 0 ? (
                  <ReservationCarousel reservations={myReservations} />
                ) : (
                  <p className="text-muted text-sm">Nenhuma reserva realizada.</p>
                )}
              </PanelContainer>

              {hasOwnerData && (
                <>
                  <PanelContainer title="Próximas Reservas — Proprietário">
                    {nextOwnerReservations.length > 0 ? (
                      <ReservationCarousel reservations={nextOwnerReservations} />
                    ) : (
                      <p className="text-muted text-sm">Não há reservas agendadas.</p>
                    )}
                  </PanelContainer>

                  <PanelContainer title="Reservas Anteriores — Proprietário">
                    {latestOwnerReservations.length > 0 ? (
                      <ReservationCarousel
                        reservations={latestOwnerReservations}
                        onReview={(id) => { setReservationId(id); setReviewOpen(true); }}
                      />
                    ) : (
                      <p className="text-muted text-sm">Nenhuma reserva no histórico.</p>
                    )}
                  </PanelContainer>

                  <PanelContainer title="Solicitações de Reservas">
                    <div className="space-y-3">
                      {ownerReservations?.map(mapSolicitationFrames)}
                    </div>
                  </PanelContainer>
                </>
              )}
            </div>

            {/* DIREITA */}
            <div className="space-y-6">

              <PanelContainer title="Meus Veículos">
                {vehicles?.length > 0 ? (
                  <div className="space-y-3">
                    {vehicles?.map((car) => (
                      <EntityFrame key={car.id}>
                        <DefaultEntityFrame
                          title={`${car.brand} ${car.model}`}
                          description={`Placa: ${car.licensePlate}`}
                        />
                      </EntityFrame>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted text-sm">Não há veículos cadastrados.</p>
                )}
              </PanelContainer>

              <PanelContainer title="Mensagens">
                {chats.length > 0 ? (
                  <div className="space-y-3">
                    {chats?.map((chat) => (
                      <EntityFrame key={chat.id}>
                        <DefaultEntityFrame
                          title={`${chat.user.name} — ${chat.subtitle}`}
                          description={chat.lastContent || "Nenhuma mensagem no momento."}
                          redirectTo={`/chat/${chat.id}`}
                        />
                      </EntityFrame>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted text-sm">Nenhuma mensagem no momento.</p>
                )}
              </PanelContainer>

            </div>
          </div>
        </section>
      </div>

      {reviewOpen && <ReviewWindow onExit={() => setReviewOpen(false)} />}
    </main>
  );
}

function GreetUser() {
  const currentTime = new Date().getHours();
  if (currentTime >= 0  && currentTime <= 12) return <>Bom dia!</>;
  if (currentTime >= 13 && currentTime <= 17) return <>Boa Tarde!</>;
  if (currentTime >= 18 && currentTime <= 23) return <>Boa noite!</>;
  return <>Bom dia!</>;
}

// function mapBookingCards(d: any) {}
