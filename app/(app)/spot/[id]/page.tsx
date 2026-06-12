"use client";
// import Link from "next/link"
import Image from "next/image";

// import Header from "@/component/header";
// import * as api from "@/app/api";
// import { PropertyResponse } from "@/interface/api/property";
import { MouseEventHandler, useEffect, useState } from "react";
import { useParams } from "next/navigation";
// import { ParkingSpotResponse } from "@/interface/api/spot";
import BlurOverlay from "@/component/blur_overlay";
// import { Spot } from "@/entity/spot";
// import Property, { PropertyDAO, useFetchProperty } from "@/entity/property";
// import { useGetPropertyById } from "@/hooks/api/property/useGetPropertyById";
import GenericWindow from "@/component/GenericWindow";
// import { Vehicle, VehicleDAO } from "@/entity/vehicle";
// import { BookingDAO } from "@/entity/booking";
import DatePeriod from "@/classes/data/DatePeriod";
// import { useGetMyVehicles } from "@/hooks/api/vehicles/useGetMyrVehicles";
// import { useApi } from "@/hooks/api/useApi";
// import { bookSpot } from "@/services/booking.service";
import { Spot } from "@classes";
// import { getSpotsByPropertyId } from "@/services/spot.service";
// import Property from "@/classes/property";
import { Vehicle } from "@classes";
// import Link from "next/link";
// import PanelLayout from "@/component/layout/PanelLayout";
import PanelContainer from "@/component/container/PanelContainer";
import CarouselContainer from "@/component/container/CarouselContainer";
// import { getReviewsFromProperty } from "@/services/review.service";
// import PropertyReviews from "@/classes/property/review/PropertyReviews";
import { EntityCard } from "@/component/container/EntityContainer/EntityCard";
import FormItem from "@/component/ui/form/FormItem";
import { sendReport } from "@/services/report.service";
import useWindow from "@/hooks/useWindow";
import StatusBadge from "@/component/ui/StatusDisplay";
import TagContainer from "@/component/container/TagContainer";
import useGetPropertyDetails from "@/modules/property/hooks/useGetPropertyDetails";
import useGetReviews from "@/modules/review/hooks/useGetReviews";
import useComponentMapper from "@/hooks/useComponentMapper";
import { Review } from "@classes";
import useGetVehicleDetails from "@/modules/vehicle/hooks/useGetVehicleDetails";
import { ReportController, ReservationController } from "@controllers";
import { BrowserService } from "@services";
import { FormUtils } from "@utils";
import { da } from "zod/v4/locales";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Page({ params }: any) {
  params = useParams() as unknown as { id: number };

  const [property, loaded, refreshSpots] = useGetPropertyDetails(
    params.id,
    true,
  ); //TODO REPLACE WITH TYPES
  const [reviews] = useGetReviews("property", params.id);
  const [vehicles] = useGetVehicleDetails();

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
  // setRev

  const [selectedSpot, setSelectedSpot] = useState(-1);
  const [selectedStartDate, setSelectedStartDate] = useState(undefined);
  const [selectedEndDate, setSelectedEndDate] = useState(undefined);

  const [bookingStatus, setBookingStatus] = useState(false);
  // const [bookingStatusWindow, setBookingStatusWindow] = useState(false);

  const [availableSpotsWindow] = useWindow(SpotAvailabilityWindow);
  const [availableVehiclesWindow] = useWindow(VehicleAvailabilityWindow);
  const [bookingStatusWindow] = useWindow(BookingStatusWindow);
  const [reportWindow] = useWindow(ReportWindow);

  const handleReserve = async (spotId: number, vehicleId: number) => {
    const datePeriod = new DatePeriod(
      new Date(2026, 4, 10),
      new Date(2026, 4, 10),
    );

    const form = FormUtils.toForm({
      spotId: spotId,
      vehicleId: vehicleId,
      startDate: "2026-01-01",
      endDate: "2026-05-10",
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

    console.log(
      `you selected spot number ${spotId} to use with car ${vehicleId}`,
    );
  };

  function VehicleCard({ raw_data }: { raw_data: Vehicle }) {
    const data: Vehicle = raw_data;

    if (!data) return null;
    return (
      <div
        className="
          bg-card
          border border-soft
          rounded-2xl
          shadow-sm
          p-5
          hover:shadow-md
          transition
        "
      >
        <h3 className="font-semibold text-base">
          {data.brand} {data.model}
        </h3>

        <p className="text-sm text-muted mt-2">Placa: {data.licensePlate}</p>
      </div>
    );
  }

  function SpotAvailabilityCard({ spot }: { spot: Spot }) {
    // console.log(spot);
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

            {/*<p>{spot.status}</p>*/}
            <StatusBadge
              conditionValue={spot?.status?.availability}
              conditionTable={{ DISPONIVEL: "green" }}
              statusLabelTable={{ green: "Disponível", gray: "Desconhecido" }}
              defaultValue={"gray"}
            />

            <div className="h-2" />
            <div className="flex flex-row my-2">
              {spot?.info?.allowedVehicles?.map((allowed) => {
                return (
                  <TagContainer key={allowed} className="ml-2">
                    {allowed}
                  </TagContainer>
                );
              })}
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
            // setShowSpotsWindow(false);
            // setShowVehicleWindow(true);
          }}
          className="
             bg-card
          border border-soft
          rounded-2xl
          shadow-sm
          p-5
          hover:shadow-md
          transition
            disabled:opacity-60
            w-full
          "
        >
          Solicitar Reserva
          {/* Disable button press if user already requested booking */}
        </button>
      </section>
    );
  }

  function SpotAvailabilityWindow() {
    return (
      <>
        <BlurOverlay show={true} onClick={() => {}} />
        <GenericWindow
          title={"Vagas Disponíveis"}
          exitButton={true}
          onExit={availableSpotsWindow?.hide || undefined}
        >
          {/* TODO insert scroll here */}
          <section className="overflow-y-scroll scroll-smooth h-120 w-full">
            {property?.spots?.map((spot: Spot) => {
              // TODO change to EntityFrame
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

    if (!spot) return null;

    return (
      <>
        <BlurOverlay show={true} onClick={() => {}} />

        <GenericWindow
          title="Reserva"
          exitButton={true}
          onExit={availableVehiclesWindow.hide}
        >
          <div
            className="
          w-full
          max-w-[550px]
          overflow-hidden
        "
          >
            <div className="flex flex-col gap-4">
              {/* Dados da vaga */}
              <section
                className="
              surface-elevated
              rounded-3xl
              p-4
              overflow-hidden
            "
              >
                <div
                  className="
                flex
                flex-col
                md:flex-row
                gap-4
                w-full
                min-w-0
              "
                >
                  <Image
                    src={spot?.info?.image?.url}
                    width={180}
                    height={125}
                    alt=""
                    className="
                  rounded-2xl
                  object-cover
                  w-full
                  md:w-[180px]
                  h-[125px]
                  shrink-0
                "
                  />

                  <div
                    className="
                  flex
                  flex-col
                  gap-3
                  flex-1
                  min-w-0
                "
                  >
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
              <div
                className="
              grid
              grid-cols-1
              lg:grid-cols-2
              gap-4
              w-full
            "
              >
                {/* Datas */}
                <section
                  className="
                surface-elevated
                rounded-3xl
                p-4
                min-w-0
              "
                >
                  <h3 className="font-semibold text-base mb-3">
                    Período da reserva
                  </h3>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm text-muted mb-2">
                        Entrada
                      </label>

                      <input
                        type="date"
                        disabled
                        className="
                      w-full
                      rounded-xl
                      border border-soft
                      bg-card
                      px-3
                      py-2
                      opacity-60
                      cursor-not-allowed
                    "
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-muted mb-2">
                        Saída
                      </label>

                      <input
                        type="date"
                        disabled
                        className="
                      w-full
                      rounded-xl
                      border border-soft
                      bg-card
                      px-3
                      py-2
                      opacity-60
                      cursor-not-allowed
                    "
                      />
                    </div>
                  </div>
                </section>

                {/* Veículos */}
                <section
                  className="
                surface-elevated
                rounded-3xl
                p-4
                flex
                flex-col
                h-[300px]
                overflow-hidden
                min-w-0
              "
                >
                  <h3 className="font-semibold text-base mb-3">
                    Selecione um veículo
                  </h3>

                  <div
                    className="
                  flex-1
                  overflow-y-auto
                  overflow-x-hidden
                  pr-2
                  min-w-0
                "
                  >
                    {vehicles?.map((vehicle) => (
                      <button
                        key={vehicle.id}
                        onClick={async () => {
                          await handleReserve(spot.id, vehicle.id);
                        }}
                        className="
                      w-full
                      p-3
                      mb-2
                      rounded-xl
                      border
                      border-soft
                      text-left
                      transition
                      hover:border-blue-400
                    "
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
                    disabled
                    className="
                  w-full
                  mt-3
                  py-2
                  rounded-xl
                  font-medium
                  btn-primary
                  opacity-50
                  cursor-not-allowed
                "
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
        <BlurOverlay show={true} onClick={() => {}} />
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
              ter tido reservada antes de você ou não está mais disponível.
              Tente novamente mais tarde caso esta vaga ainda esteja disponível
            </p>
          )}
        </GenericWindow>
      </>
    );
  }

  function ReportWindow({ onExit }: { onExit: MouseEventHandler }) {
    const [messageState, setMessageState] = useState<boolean | undefined>(
      undefined,
    );

    const handleReport = async (e) => {
      e.preventDefault();
      const currentTarget = e.currentTarget;
      const formData = new FormData(currentTarget);
      const res = await ReportController.register(
        BrowserService.getToken(),
        "SPOT",
        1,
        formData,
      );
      // const res = await sendReport("SPOT", 1, formData);
      setMessageState(res);
    };
    const messages = {
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
              property.spots?.map((spot) => {
                return { value: String(spot.id), label: spot.info?.identifier };
              }) ?? []
            }
          />

          <div className="h-4" />
          <FormItem
            type="text"
            label="Qual motivo para a denúncia?"
            name={"reason"}
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
        <BlurOverlay show={true} onClick={() => {}} />
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

  // console.log(property);
  // if (property === undefined) return <section></section>;
  return (
    <main>
      {/*<Header />*/}

      {/* TODO transform into ImageCarousel */}
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
        <div
          className="
          grid
          grid-cols-3
          gap-2
          h-[500px]
          rounded-4xl
          overflow-hidden
        "
        >
          {/* Imagem principal */}
          <div className="col-span-2 relative">
            {property?.info?.images[0] ? (
              <Image
                fill
                src={property.info?.images[0].url}
                alt="Imagem principal da propriedade"
                className="
                object-cover
                hover:scale-[1.02]
                transition-transform
                duration-300
              "
              />
            ) : (
              <div className="w-full h-full bg-card" />
            )}
          </div>

          {/* Imagens secundárias */}
          <div className="grid grid-rows-2 gap-2">
            {/* Imagem secundária */}
            <div className="relative">
              {property?.info?.images[1] ? (
                <Image
                  fill
                  src={property.info?.images[1].url}
                  alt="Imagem da propriedade"
                  className="
                  object-cover
                  hover:scale-[1.02]
                  transition-transform
                  duration-300
                "
                />
              ) : (
                <div className="w-full h-full bg-card" />
              )}
            </div>

            {/* Imagem terciária */}
            <div className="relative">
              {property?.info?.images[2] ? (
                <Image
                  fill
                  src={property.info?.images[2].url}
                  alt="Imagem da propriedade"
                  className="
                  object-cover
                  hover:scale-[1.02]
                  transition-transform
                  duration-300
                "
                />
              ) : (
                <div className="w-full h-full bg-card" />
              )}
            </div>
          </div>
        </div>

        {/* Detalhes + Vagas */}
        <div
          className="
    grid
    grid-cols-1
    lg:grid-cols-3
    gap-6
    mt-6
  "
        >
          {/* Dados da propriedade */}
          <div
            className="
      lg:col-span-2
      surface-elevated
      rounded-4xl
      p-8
    "
          >
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
                {/*⭐ Avaliação: {reviews?.averageRating || 1}/5*/}⭐ Avaliação:{" "}
                {0 || 1}/5
              </span>
            </div>
          </div>

          {/* Lista de vagas */}
          <div
            className="
      surface-elevated
      rounded-4xl
      p-4
      max-h-[600px]
      overflow-y-auto
    "
          >
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
            className="
              text-sm
              text-muted
              cursor-pointer
              text-end
              hover:text-primary
              transition-colors
            "
          >
            Ver mais vagas
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-8">
        <PanelContainer title="Avaliações">
          {reviews?.length > 0 ? (
            <>
              <p className="mb-4">
                {/*Avaliação Geral: {reviews?.averageRating || 1}/5*/}
                Avaliação Geral: {0 || 1}/5
              </p>

              <CarouselContainer title={""} cards={reviewCards} />
            </>
          ) : (
            <p>No momento, nenhuma avaliação foi registrada.</p>
          )}
        </PanelContainer>
      </section>

      {availableSpotsWindow.component && <availableSpotsWindow.component />}
      {availableVehiclesWindow.component && (
        <availableVehiclesWindow.component />
      )}
      {bookingStatusWindow.component && <bookingStatusWindow.component />}

      {reportWindow.component && <reportWindow.component />}
    </main>
  );
}
