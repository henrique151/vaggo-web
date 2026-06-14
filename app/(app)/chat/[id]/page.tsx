"use client";
import Image from "next/image";
import { MouseEventHandler, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import BlurOverlay from "@/component/blur_overlay";
import GenericWindow from "@/component/GenericWindow";
import { Spot } from "@classes";
import { Vehicle } from "@classes";
import PanelContainer from "@/component/container/PanelContainer";
import CarouselContainer from "@/component/container/CarouselContainer";
import { EntityCard } from "@/component/container/EntityContainer/EntityCard";
import FormItem from "@/component/ui/form/FormItem";
import useWindow from "@/hooks/useWindow";
import StatusBadge from "@/component/ui/StatusDisplay";
import TagContainer from "@/component/container/TagContainer";
import useGetPropertyDetails from "@/modules/property/hooks/useGetPropertyDetails";
import useGetReviews from "@/modules/review/hooks/useGetReviews";
import useComponentMapper from "@/hooks/useComponentMapper";
import { Review } from "@classes";
import useGetVehicleDetails from "@/modules/vehicle/hooks/useGetVehicleDetails";
import useGetReservations from "@/modules/reservation/hooks/useGetReservations";
import {
  ReviewController,
  ReportController,
  ReservationController,
} from "@controllers";
import { BrowserService } from "@services";
import { FormUtils } from "@utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Page({ params }: any) {
  params = useParams() as unknown as { id: number };

  const [property, loaded, refreshSpots] = useGetPropertyDetails(
    params.id,
    true,
  );
  const [reviews, , refreshReviews] = useGetReviews("property", params.id);
  const [vehicles] = useGetVehicleDetails();
  // Reservas do usuário — usadas para escolher o reservationId ao avaliar
  const [myReservations] = useGetReservations();

  const reviewCards = useComponentMapper(reviews, (review: Review) => {
    return (
      <EntityCard
        key={review.id}
        title={`${review.info.rating}/5`}
        description={`${review.info.comment}`}
        image={review.info.author.avatar}
      />
    );
  });

  const [selectedSpot, setSelectedSpot] = useState(-1);
  const [bookingStatus, setBookingStatus] = useState(false);

  const [availableSpotsWindow] = useWindow(SpotAvailabilityWindow);
  const [availableVehiclesWindow] = useWindow(VehicleAvailabilityWindow);
  const [bookingStatusWindow] = useWindow(BookingStatusWindow);
  const [reportWindow] = useWindow(ReportWindow);
  const [reviewWindow] = useWindow(ReviewWindow);

  const handleReserve = async (spotId: number, vehicleId: number) => {
    const spot = property?.spots?.find((s) => s.id === spotId);
    const startDate = spot?.operatingHours?.datePeriod?.start ?? "";
    const endDate = spot?.operatingHours?.datePeriod?.end ?? "";

    const form = FormUtils.toForm({
      spotId: spotId,
      vehicleId: vehicleId,
      startDate,
      endDate,
    });

    const res = await ReservationController.register(
      BrowserService.getToken(),
      form,
    );
    console.log(res);
    setBookingStatus(res);

    availableVehiclesWindow.hide();
    bookingStatusWindow.show();
    refreshSpots();
  };

  function VehicleCard({ raw_data }: { raw_data: Vehicle }) {
    const data: Vehicle = raw_data;
    if (!data) return null;
    return (
      <div className="bg-card border border-soft rounded-2xl shadow-sm p-5 hover:shadow-md transition">
        <h3 className="font-semibold text-base">
          {data.brand} {data.model}
        </h3>
        <p className="text-sm text-muted mt-2">Placa: {data.licensePlate}</p>
      </div>
    );
  }

  function SpotAvailabilityCard({ spot }: { spot: Spot }) {
    return (
      <section className="surface-elevated w-full rounded-3xl p-8 mb-4">
        <div className="flex flex-row w-full">
          <div className="w-1/2">
            <Image
              className="rounded-3xl"
              src={spot.info.image.url}
              width={128}
              height={128}
              alt={""}
            />
          </div>
          <div className="flex flex-col items-end w-1/2">
            <h2 className="font-semibold mb-6">{spot.info.identifier}</h2>
            <StatusBadge
              conditionValue={spot?.status?.availability}
              conditionTable={{ DISPONIVEL: "green" }}
              statusLabelTable={{ green: "Disponível", gray: "Desconhecido" }}
              defaultValue={"gray"}
            />
            <div className="h-2" />
            <div className="flex flex-row my-2">
              {spot?.info?.allowedVehicles?.map((allowed) => (
                <TagContainer key={allowed} className="ml-2">
                  {allowed}
                </TagContainer>
              ))}
            </div>
            <p>Tamanho: {spot?.info?.size}</p>
            <p>Preço: R${spot?.info?.price}</p>
          </div>
        </div>

        <button
          onClick={() => {
            setSelectedSpot(spot.id);
            availableSpotsWindow.hide();
            availableVehiclesWindow.show();
          }}
          className="bg-card border border-soft rounded-2xl shadow-sm p-5 hover:shadow-md transition disabled:opacity-60 w-full"
        >
          Solicitar Reserva
        </button>
      </section>
    );
  }

  function SpotAvailabilityWindow() {
    return (
      <>
        <BlurOverlay show={true} onClick={() => { }} />
        <GenericWindow
          title={"Vagas Disponíveis"}
          exitButton={true}
          onExit={availableSpotsWindow?.hide || undefined}
        >
          <section className="overflow-y-scroll scroll-smooth h-120 w-full">
            {property?.spots?.map((spot: Spot) => {
              if (
                spot?.status?.availability != "INDISPONIVEL" &&
                spot?.status?.availability != "OCUPADA"
              ) {
                return (
                  <SpotAvailabilityCard
                    key={`available_spot_${spot.id}`}
                    spot={spot}
                  />
                );
              }
            })}
          </section>
        </GenericWindow>
      </>
    );
  }

  function VehicleAvailabilityWindow() {
    const spot = property?.spots?.find((s) => s.id === selectedSpot);
    const [selectedVehicleId, setSelectedVehicleId] = useState<number>(-1);

    if (!spot) return null;

    return (
      <>
        <BlurOverlay show={true} onClick={() => { }} />
        <GenericWindow
          title="Reserva"
          exitButton={true}
          onExit={availableVehiclesWindow.hide}
        >
          <div className="w-full max-w-[550px] overflow-hidden">
            <div className="flex flex-col gap-4">
              {/* Dados da vaga */}
              <section className="surface-elevated rounded-3xl p-4 overflow-hidden">
                <div className="flex flex-col md:flex-row gap-4 w-full min-w-0">
                  <Image
                    src={spot?.info?.image?.url}
                    width={180}
                    height={125}
                    alt=""
                    className="rounded-2xl object-cover w-full md:w-[180px] h-[125px] shrink-0"
                  />
                  <div className="flex flex-col gap-3 flex-1 min-w-0">
                    <h2 className="text-xl font-semibold break-words">
                      {spot?.info.identifier}
                    </h2>
                    <p className="text-sm">Tamanho: {spot?.info.size}</p>
                    <p className="text-sm">Preço: R$ {spot?.info.price}</p>
                    <div className="flex flex-wrap gap-1">
                      {spot?.info?.allowedVehicles?.map((allowed) => (
                        <TagContainer key={allowed}>{allowed}</TagContainer>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Parte inferior */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
                {/* Disponibilidade */}
                <section className="surface-elevated rounded-3xl p-4 min-w-0">
                  <h3 className="font-semibold text-base mb-3">
                    Disponibilidade da vaga
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="block text-sm text-muted mb-1">
                        Período disponível
                      </p>
                      <div className="flex gap-2 items-center">
                        <span className="text-sm font-medium">
                          {spot?.operatingHours?.datePeriod?.start
                            ? new Date(
                              spot.operatingHours.datePeriod.start,
                            ).toLocaleDateString("pt-BR")
                            : "—"}
                        </span>
                        <span className="text-muted text-xs">até</span>
                        <span className="text-sm font-medium">
                          {spot?.operatingHours?.datePeriod?.end
                            ? new Date(
                              spot.operatingHours.datePeriod.end,
                            ).toLocaleDateString("pt-BR")
                            : "—"}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="block text-sm text-muted mb-1">Horário</p>
                      <div className="flex gap-2 items-center">
                        <span className="text-sm font-medium">
                          {spot?.operatingHours?.timePeriod?.start ?? "—"}
                        </span>
                        <span className="text-muted text-xs">às</span>
                        <span className="text-sm font-medium">
                          {spot?.operatingHours?.timePeriod?.end ?? "—"}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-muted italic mt-2">
                      O período é fixo conforme cadastrado pelo proprietário.
                    </p>
                  </div>
                </section>

                {/* Veículos */}
                <section className="surface-elevated rounded-3xl p-4 flex flex-col h-[300px] overflow-hidden min-w-0">
                  <h3 className="font-semibold text-base mb-3">
                    Selecione um veículo
                  </h3>
                  <div className="flex-1 overflow-y-auto overflow-x-hidden pr-2 min-w-0">
                    {vehicles?.map((vehicle) => (
                      <button
                        key={vehicle.id}
                        onClick={() => setSelectedVehicleId(vehicle.id)}
                        className={`w-full p-3 mb-2 rounded-xl border text-left transition ${selectedVehicleId === vehicle.id
                          ? "border-primary bg-primary/5"
                          : "border-soft hover:border-blue-400"
                          }`}
                      >
                        <h4 className="text-sm font-medium break-words">
                          {vehicle.brand} {vehicle.model}
                        </h4>
                        <p className="text-xs text-muted break-words">
                          {vehicle.licensePlate}
                        </p>
                      </button>
                    ))}
                  </div>
                  <button
                    disabled={selectedVehicleId === -1}
                    onClick={async () => {
                      if (selectedVehicleId !== -1) {
                        await handleReserve(spot.id, selectedVehicleId);
                      }
                    }}
                    className="w-full mt-3 py-2 rounded-xl font-medium btn-primary transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Reservar Vaga
                  </button>
                </section>
              </div>
            </div>
          </div>
        </GenericWindow>
      </>
    );
  }

  function BookingStatusWindow({ onExit }: { onExit: MouseEventHandler }) {
    return (
      <>
        <BlurOverlay show={true} onClick={() => { }} />
        <GenericWindow
          title={
            bookingStatus ? "Sucesso!" : "Não foi possível realizar a reserva"
          }
          exitButton={true}
          onExit={bookingStatusWindow.hide}
        >
          {bookingStatus ? (
            <p>Sua vaga está reservada e aguardando aprovação do dono</p>
          ) : (
            <p>
              Infelizmente não foi possível realizar sua reserva. A vaga já pode
              ter sido reservada antes de você ou não está mais disponível. Tente
              novamente mais tarde caso esta vaga ainda esteja disponível.
            </p>
          )}
        </GenericWindow>
      </>
    );
  }

  // ─── CORREÇÃO: ReportWindow ────────────────────────────────────────────────
  // Bug corrigido: reportedUserId agora usa property?.user?.id corretamente;
  // adicionado campo de descrição; validação de motivo vazio.
  function ReportWindow({ onExit }: { onExit: MouseEventHandler }) {
    const [messageState, setMessageState] = useState<boolean | undefined>(
      undefined,
    );

    const handleReport = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);

      const targetId = Number(formData.get("targetId"));
      if (!targetId || targetId <= 0) {
        alert("Por favor, selecione uma vaga.");
        return;
      }

      const reason = (formData.get("reason") as string)?.trim() ?? "";
      if (reason.length < 5) {
        alert("Por favor, selecione um motivo válido para a denúncia.");
        return;
      }

      // Busca o dono da vaga selecionada
      const selectedSpot = property?.spots?.find((s) => s.id === targetId);
      const spotOwner = selectedSpot?.property?.user?.id ?? property?.user?.id;

      if (!spotOwner || spotOwner <= 0) {
        alert("Não foi possível identificar o proprietário desta vaga.");
        console.error("[ReportWindow] property.user:", property?.user, "selectedSpot.property.user:", selectedSpot?.property?.user);
        return;
      }

      const description = (formData.get("description") as string) || undefined;

      const payload: Record<string, any> = {
        reportedUserId: Number(spotOwner),
        targetType: "SPOT",
        targetId: targetId,
        reason: reason,
      };
      if (description) payload.description = description;

      console.log("[ReportWindow] Enviando payload:", payload);

      try {
        const token = BrowserService.getToken();
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000"}/reports`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token?.token}`,
          },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          setMessageState(true);
        } else {
          const text = await res.text();
          console.error("[ReportWindow] Status:", res.status, "Body:", text);
          setMessageState(false);
        }
      } catch (err) {
        console.error("[ReportWindow] Exceção:", err);
        setMessageState(false);
      }
    };

    const messages: Record<string, React.ReactNode> = {
      true: (
        <p>
          Sua denúncia foi enviada e será analisada por um de nossos
          administradores.
        </p>
      ),
      false: (
        <p>
          Houve um erro durante o envio da denúncia, tente novamente dentro de
          alguns minutos. Pedimos desculpas pelo transtorno.
        </p>
      ),
      undefined: (
        <form onSubmit={handleReport}>
          <FormItem
            type="select"
            label={"Selecione a vaga que gostaria de denunciar:"}
            name={"targetId"}
            items={
              property?.spots?.map((spot) => ({
                value: String(spot.id),
                label: spot.info?.identifier,
              })) ?? []
            }
          />

          <div className="h-4" />

          <FormItem
            type="select"
            label="Qual motivo para a denúncia?"
            name="reason"
            items={[
              { value: "Conteúdo Inadequado", label: "Conteúdo Inadequado" },
              { value: "Fraude/Golpe", label: "Fraude/Golpe" },
              { value: "Informações Incorretas", label: "Informações Incorretas" },
              { value: "Outro motivo não listado", label: "Outro" },
            ]}
          />

          <div className="h-4" />

          {/* BUG FIX: campo de descrição adicionado */}
          <FormItem
            type="text"
            label="Descrição (opcional)"
            name="description"
          />

          <div className="h-4" />

          <button
            type="submit"
            className="w-full py-3 rounded-lg font-medium text-white btn-primary btn-hover transition disabled:opacity-60"
          >
            Enviar
          </button>
        </form>
      ),
    };

    return (
      <>
        <BlurOverlay show={true} onClick={() => { }} />
        <GenericWindow
          title={"Denúncia"}
          exitButton={true}
          onExit={reportWindow.hide}
        >
          {messages[String(messageState)]}
        </GenericWindow>
      </>
    );
  }

  // ─── ReviewWindow ────────────────────────────────────────────────────────
  // CORREÇÃO PRINCIPAL: o backend exige reservationId > 0.
  // Buscamos as reservas APROVADAS do usuário nesta propriedade e deixamos
  // ele escolher qual reserva quer avaliar antes de enviar.
  function ReviewWindow({ onExit }: { onExit: MouseEventHandler }) {
    const [messageState, setMessageState] = useState<boolean | undefined>(
      undefined,
    );

    // Filtra reservas aprovadas que pertencem a esta propriedade
    const eligibleReservations = (myReservations ?? []).filter((r) => {
      const approvedStatus =
        r.status === "APROVADA" || r.status === "APPROVED";
      // Tenta identificar a propriedade pela vaga
      const spotPropertyId =
        (r.info?.spot as any)?.property?.id ??
        (r.info?.spot as any)?.propertyId;
      const matchesProperty =
        spotPropertyId === Number(params.id) ||
        // fallback: se não tiver propriedade no spot, inclui todas aprovadas
        spotPropertyId === undefined;
      return approvedStatus && matchesProperty;
    });

    const hasEligible = eligibleReservations.length > 0;

    const handleReview = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);

      const reservationId = Number(formData.get("reservationId"));
      if (!reservationId || reservationId <= 0) {
        alert("Selecione uma reserva aprovada para avaliar.");
        return;
      }

      // Envia como JSON para garantir tipos corretos (rating como number)
      const payload = {
        reservationId: reservationId,
        rating: Number(formData.get("rating")),
        comment: (formData.get("comment") as string) || undefined,
      };

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000"}/reviews`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${BrowserService.getToken()?.token}`,
            },
            body: JSON.stringify(payload),
          },
        );

        if (res.ok) {
          setMessageState(true);
          refreshReviews?.();
        } else {
          const body = await res.json().catch(() => ({}));
          console.error("[ReviewWindow] Erro da API:", body);
          setMessageState(false);
        }
      } catch (e) {
        console.error("[ReviewWindow] Exceção:", e);
        setMessageState(false);
      }
    };

    const messages: Record<string, React.ReactNode> = {
      true: <p>Avaliação enviada com sucesso! Obrigado pelo seu feedback. 🎉</p>,
      false: (
        <p>
          Houve um erro ao enviar a avaliação. Verifique se você já não avaliou
          esta reserva e tente novamente.
        </p>
      ),
      undefined: !hasEligible ? (
        // Sem reservas aprovadas — explica o motivo
        <div className="text-center py-4">
          <p className="text-4xl mb-3">🚗</p>
          <p className="font-medium mb-2">Nenhuma reserva aprovada encontrada</p>
          <p className="text-sm text-muted">
            Você só pode avaliar esta propriedade após ter uma reserva aprovada
            aqui. Faça uma reserva e aguarde a aprovação do proprietário.
          </p>
        </div>
      ) : (
        <form onSubmit={handleReview}>
          {/* Seleciona qual reserva aprovada será avaliada */}
          <FormItem
            type="select"
            label="Reserva que deseja avaliar"
            name="reservationId"
            items={eligibleReservations.map((r) => ({
              value: String(r.id),
              label: `Reserva #${r.id} — ${r.info?.spot?.info?.identifier ?? "Vaga"} (${r.info?.date?.period?.start
                ? new Date(r.info.date.period.start).toLocaleDateString("pt-BR")
                : "—"
                })`,
            }))}
          />

          <div className="h-4" />

          <FormItem
            type="select"
            label="Nota"
            name="rating"
            items={[
              { value: "5", label: "⭐⭐⭐⭐⭐ — Excelente" },
              { value: "4", label: "⭐⭐⭐⭐ — Bom" },
              { value: "3", label: "⭐⭐⭐ — Regular" },
              { value: "2", label: "⭐⭐ — Ruim" },
              { value: "1", label: "⭐ — Péssimo" },
            ]}
          />

          <div className="h-4" />

          <FormItem
            type="text"
            label="Comentário (opcional)"
            name="comment"
          />

          <div className="h-4" />

          <button
            type="submit"
            className="w-full py-3 rounded-lg font-medium text-white btn-primary transition"
          >
            Enviar Avaliação
          </button>
        </form>
      ),
    };

    return (
      <>
        <BlurOverlay show={true} onClick={() => { }} />
        <GenericWindow
          title="Avaliar Propriedade"
          exitButton={true}
          onExit={reviewWindow.hide}
        >
          {messages[String(messageState)]}
        </GenericWindow>
      </>
    );
  }

  return (
    <main>
      <section className="max-w-7xl mx-auto px-6 py-8">
        {/* Nome da propriedade */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-semibold text-primary">
            {property?.info?.name || "Propriedade"}
          </h1>

          <button
            className="cursor-pointer text-sm text-rose-400 hover:text-rose-500 transition-colors"
            onClick={reportWindow.show}
          >
            Denunciar
          </button>
        </div>

        {/* Grid de imagens */}
        <div className="grid grid-cols-3 gap-2 h-[500px] rounded-4xl overflow-hidden">
          <div className="col-span-2 relative">
            {property?.info?.images[0] ? (
              <Image
                fill
                src={property.info?.images[0].url}
                alt="Imagem principal da propriedade"
                className="object-cover hover:scale-[1.02] transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full bg-card" />
            )}
          </div>

          <div className="grid grid-rows-2 gap-2">
            <div className="relative">
              {property?.info?.images[1] ? (
                <Image
                  fill
                  src={property.info?.images[1].url}
                  alt="Imagem da propriedade"
                  className="object-cover hover:scale-[1.02] transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full bg-card" />
              )}
            </div>
            <div className="relative">
              {property?.info?.images[2] ? (
                <Image
                  fill
                  src={property.info?.images[2].url}
                  alt="Imagem da propriedade"
                  className="object-cover hover:scale-[1.02] transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full bg-card" />
              )}
            </div>
          </div>
        </div>

        {/* Detalhes + Vagas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Dados da propriedade */}
          <div className="lg:col-span-2 surface-elevated rounded-4xl p-8">
            <p className="text-sm text-muted mb-2">
              {property?.info?.type || "Tipo"}
            </p>
            <p className="text-primary mb-6">
              {property?.info?.description || "Descrição"}
            </p>
            <div className="flex flex-wrap gap-6 text-sm">
              <span className="text-muted">
                🚗 Capacidade total: {property?.info?.totalCapacity || "0"}{" "}
                vaga(as)
              </span>
              <span className="text-muted">
                {reviews?.length > 0
                  ? `⭐ Avaliação: ${(
                    reviews.reduce(
                      (acc, curr) => acc + Number(curr.info.rating),
                      0,
                    ) / reviews.length
                  ).toFixed(1)}/5`
                  : "⭐ Ainda sem avaliações"}
              </span>
            </div>
          </div>

          {/* Lista de vagas */}
          <div className="surface-elevated rounded-4xl p-4 max-h-[600px] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Vagas Disponíveis</h2>
            {property?.spots
              ?.filter(
                (spot) =>
                  spot?.status?.availability !== "INDISPONIVEL" &&
                  spot?.status?.availability !== "OCUPADA",
              )
              .map((spot) => (
                <SpotAvailabilityCard
                  key={`available_spot_${spot.id}`}
                  spot={spot}
                />
              ))}
          </div>
        </div>

        {/* Ver mais vagas */}
        <div className="mt-4 justify-start p-4">
          <p
            onClick={availableSpotsWindow.show}
            className="text-sm text-muted cursor-pointer text-end hover:text-primary transition-colors"
          >
            Ver mais vagas
          </p>
        </div>
      </section>

      {/* ─── Seção de Avaliações ──────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 pb-8">
        <PanelContainer title="Avaliações">
          <div className="flex justify-between items-center mb-4">
            {reviews?.length > 0 ? (
              <p>
                Avaliação Geral:{" "}
                {(
                  reviews.reduce(
                    (acc, curr) => acc + Number(curr.info.rating),
                    0,
                  ) / reviews.length
                ).toFixed(1)}
                /5
              </p>
            ) : (
              <p className="text-muted">⭐ Ainda sem avaliações</p>
            )}

            {/* BUG FIX: botão Avaliar sempre visível */}
            <button
              onClick={reviewWindow.show}
              className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition"
            >
              ✏️ Avaliar
            </button>
          </div>

          {reviews?.length > 0 && (
            <CarouselContainer title={""} cards={reviewCards} />
          )}
        </PanelContainer>
      </section>

      {availableSpotsWindow.component && <availableSpotsWindow.component />}
      {availableVehiclesWindow.component && (
        <availableVehiclesWindow.component />
      )}
      {bookingStatusWindow.component && <bookingStatusWindow.component />}
      {reportWindow.component && <reportWindow.component />}
      {reviewWindow.component && <reviewWindow.component />}
    </main>
  );
}