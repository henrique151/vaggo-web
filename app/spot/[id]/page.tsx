"use client";
// import Link from "next/link"
import Image from "next/image";

import Header from "@/component/header";
// import * as api from "@/app/api";
// import { PropertyResponse } from "@/interface/api/property";
import { MouseEventHandler, useEffect, useState } from "react";
import { useParams } from "next/navigation";
// import { ParkingSpotResponse } from "@/interface/api/spot";
import BlurOverlay from "@/component/blur_overlay";
// import { Spot } from "@/entity/spot";
// import Property, { PropertyDAO, useFetchProperty } from "@/entity/property";
import { useGetPropertyById } from "@/hooks/api/property/useGetPropertyById";
import GenericWindow from "@/component/GenericWindow";
// import { Vehicle, VehicleDAO } from "@/entity/vehicle";
// import { BookingDAO } from "@/entity/booking";
import DatePeriod from "@/classes/data/DatePeriod";
import { useGetMyVehicles } from "@/hooks/api/vehicles/useGetMyrVehicles";
// import { useApi } from "@/hooks/api/useApi";
import { bookSpot } from "@/services/booking.service";
import { Spot } from "@/classes/spot";
import { getSpotsByPropertyId } from "@/services/spot.service";
import Property from "@/classes/property";
import { Vehicle } from "@/classes/vehicle";
import Link from "next/link";
import PanelLayout from "@/component/layout/PanelLayout";
import PanelContainer from "@/component/container/PanelContainer";
import CarouselContainer from "@/component/container/CarouselContainer";
import { getReviewsFromProperty } from "@/services/review.service";
import PropertyReviews from "@/classes/property/review/PropertyReviews";
import { EntityCard } from "@/component/container/EntityContainer/EntityCard";
import FormItem from "@/component/ui/form/FormItem";
import { sendReport } from "@/services/report.service";
import useWindow from "@/hooks/useWindow";
import StatusBadge from "@/component/ui/StatusDisplay";
import TagContainer from "@/component/container/TagContainer";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Page({ params }: any) {
  params = useParams() as unknown as { id: number };

  const [spots, setSpots] = useState<Spot[]>([]);
  const [showWindow, setShowWindow] = useState(false);

  const [property, propertyLoading] = useGetPropertyById({
    id: params.id,
    withSpots: true,
  }); //TODO REPLACE WITH TYPES
  const [vehicles, setVehicles] = useGetMyVehicles();
  const [reviews, setReviews] = useState<PropertyReviews>(undefined);
  const [reviewCards, setReviewCards] = useState<React.ReactNode[]>([]);

  // const [showSpotsWindow, setShowSpotsWindow] = useState(false);
  // const [showVehicleWindow, setShowVehicleWindow] = useState(false);
  // const [reportWindow, setReportWindow] = useState(false);

  const [selectedSpot, setSelectedSpot] = useState(-1);
  // const [selectedVehicle, setSelectedVehicle] = useState(-1);

  const [bookingStatus, setBookingStatus] = useState(false);
  // const [bookingStatusWindow, setBookingStatusWindow] = useState(false);

  const [availableSpotsWindow] = useWindow(SpotAvailabilityWindow);
  const [availableVehiclesWindow] = useWindow(VehicleAvailabilityWindow);
  const [bookingStatusWindow] = useWindow(BookingStatusWindow);

  // console.log("windowTest");
  // console.log(windowTest);

  useEffect(() => {
    const load = async () => {
      setSpots(await getSpotsByPropertyId(params.id));
      const reviews = await getReviewsFromProperty(params.id);
      if (reviews) {
        setReviews(reviews);

        const cards = reviews.reviews.map((review) => {
          return (
            <EntityCard
              key={review.id}
              title={`${review.rating}/5`}
              description={`${review.comment}`}
              image={review.user.avatar}
            />
          );
        });
        setReviewCards(cards);
      }
    };
    load();
  }, []);

  const handleReserve = async (spotId: number, vehicleId: number) => {
    const datePeriod = new DatePeriod(
      new Date(2026, 4, 10),
      new Date(2026, 4, 10),
    );

    // setSelectedVehicle(vehicleId);

    // const res = await BookingDAO.reserve(selectedSpot, vehicleId, datePeriod);
    const res = await bookSpot({
      id: spotId,
      vehicleId: vehicleId,
      datePeriod: datePeriod,
    });
    // const res = true;

    console.log(
      `you selected spot number ${spotId} to use with car ${vehicleId}`,
    );

    console.log(res);

    if (res) {
      console.log("success!");
      setBookingStatus(true);

      setSpots(await getSpotsByPropertyId(Number(params.id)));
      // console.log(document.getElementById(`available_spot_${spotId}`));
    } else {
      setBookingStatus(false);
    }
    availableVehiclesWindow.hide();
    bookingStatusWindow.show();
    // setShowVehicleWindow(false);
    // setBookingStatusWindow(true);

    // return res;
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
        <h3 className="text-lg font-semibold text-base">
          {data.brand} {data.model}
        </h3>

        <p className="text-sm text-muted mt-2">Placa: {data.licensePlate}</p>
      </div>
    );
  }

  function SpotAvailabilityCard({ spot }: { spot: Spot }) {
    console.log(spot);
    return (
      <section className="surface-elevated w-full rounded-3xl p-8 w-100 mb-4">
        <div className="flex flex-row w-full">
          <div className="w-1/2">
            <Image
              className="rounded-3xl"
              src={spot.image.url}
              width={128}
              height={128}
              alt={""}
            />
          </div>
          <div className="flex flex-col items-end w-1/2">
            <h2 className="font-semibold mb-6">{spot.identifier}</h2>

            {/*<p>{spot.status}</p>*/}
            <StatusBadge
              conditionValue={spot.status}
              conditionTable={{ DISPONIVEL: "green" }}
              statusLabelTable={{ green: "Disponível", gray: "Desconhecido" }}
              defaultValue={"gray"}
            />

            <div className="h-2" />
            <div className="flex flex-row my-2">
              {spot.allowedVehicles.map((allowed) => {
                return (
                  <TagContainer key={allowed} className="ml-2">
                    {allowed}
                  </TagContainer>
                );
              })}
            </div>
            <p>Tamanho: {spot.size}</p>
            <p>Preço: R${spot.price}</p>
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
            {spots.map((spot: Spot) => {
              // TODO change to EntityFrame
              if (spot.status != "INDISPONIVEL" && spot.status != "OCUPADA") {
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

  function VehicleAvailabilityWindow({
    onExit,
  }: {
    onExit: MouseEventHandler;
  }) {
    // useEffect(() => {
    //   const load = async () => {
    //     if (!vehicles) {
    //       const vehicles = await VehicleDAO.getFromUser();
    //       setVehicles(vehicles);
    //     }
    //   };

    //   load();

    //   console.log(vehicles);
    // }, []);
    // if (!vehicles) return <></>;
    return (
      <>
        <BlurOverlay show={true} onClick={() => {}} />
        <GenericWindow
          title={"Selecione um veículo para esta vaga"}
          exitButton={true}
          onExit={availableVehiclesWindow.hide}
        >
          {vehicles?.map((vehicle) => {
            return (
              <button
                key={vehicle.id}
                onClick={async () => {
                  console.log(vehicle.id);
                  await handleReserve(selectedSpot, vehicle.id);
                }}
              >
                <VehicleCard raw_data={vehicle} />
              </button>
            );
          }) || "Não há veículos disponíveis para esta vaga."}
          {/*<p>Map all vehicles here</p>*/}
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
      const res = await sendReport("SPOT", 1, formData);
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
              spots?.map((spot) => {
                return { value: spot.id, label: spot.identifier };
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
        <GenericWindow title={"Denúncia"} exitButton={true} onExit={onExit}>
          {messages[String(messageState)]}
        </GenericWindow>
      </>
    );
  }

  if (property === undefined) return <section></section>;
  return (
    <main>
      {/*<Header />*/}
      {/* TODO transform into ImageCarousel */}
      <section className="m-10 flex flex-row">
        <section className="surface-elevated w-full rounded-3xl p-8 flex flex-row">
          <h2 className="text-2xl w-1/2  mb-6 mr-6">
            {property?.images[0] ? (
              <Image
                width={1280}
                height={768}
                src={`${property.images[0]}`}
                alt={"Imagem da Propriedade"}
                className="
                  w-full h-full object-cover
              "
              />
            ) : null}
          </h2>

          <div className="flex w-1/2 flex-col items-end">
            <button
              className="cursor-pointer text-sm text-red-300 mb-3"
              onClick={() => setReportWindow(true)}
            >
              Denunciar
            </button>

            <h1 className="text-2xl font-semibold">
              {property?.name || "Propriedade"}
            </h1>
            <p className="text-sm mb-4 text-gray-400">
              {property?.type || "Tipo"}
            </p>
            <p>{property?.description || "Descrição"}</p>
            <p>Capacidade total: {property?.totalCapacity || "0"} Vaga(as)</p>
            <p>Avaliação: {reviews?.averageRating || 1}/5</p>

            {/* TODO get all spots prices, return minnimum and maximum value of each one */}
            {/*<h2 className="text-2xl font-semibold mt-6">R$ 0 / Reserva</h2>*/}

            {/* TODO responsive: make buttons go down each other when resizing to small screen */}
            {/*<div className="grid grid-cols-2 w-full mt-3">*/}
            <div className="w-full mt-3">
              <button
                // onClick={() => setShowWindow(true)}
                onClick={() => {
                  availableSpotsWindow.show();
                  console.log("ojad");
                }}
                className="w-full py-3 rounded-lg font-medium text-white btn-primary btn-hover transition disabled:opacity-60"
              >
                Vagas Disponíveis
              </button>
              {/*<Link href={`${params.id}/chat`} className="ml-2">
                <button
                  // onClick={() => setShowWindow(true)}
                  className="w-full py-3 rounded-lg font-medium text-white bg-gray-900 hover:bg-black transition disabled:opacity-60"
                >
                  Conversar
                </button>
              </Link>*/}
            </div>
          </div>
        </section>
      </section>

      <section className="m-10">
        <PanelContainer title="Avaliações">
          {reviews?.reviews.length > 0 ? (
            <>
              <p className="mb-2">
                Avaliação Geral: {reviews?.averageRating || 1}/5
              </p>
              <CarouselContainer title={""} cards={reviewCards} />
            </>
          ) : (
            <p>No momento, nenhuma avaliação foi registrada.</p>
          )}
        </PanelContainer>
      </section>
      {/*
      {showSpotsWindow && (
        <SpotAvailabilityWindow
          property={property}
          onExit={() => {
            setShowSpotsWindow(false);
            // console.log("hello!");
          }}
        />
      )}
      */}

      {availableSpotsWindow.component && <availableSpotsWindow.component />}
      {availableVehiclesWindow.component && (
        <availableVehiclesWindow.component />
      )}
      {bookingStatusWindow.component && <bookingStatusWindow.component />}

      {/*{showVehicleWindow && (
        <VehicleAvailabilityWindow
          onExit={() => {
            setShowVehicleWindow(false);
            // console.log("hello!");
          }}
        />
      )}

      {bookingStatusWindow && (
        <BookingStatusWindow
          onExit={() => {
            setBookingStatusWindow(false);
            // console.log("hello!");
          }}
        />
      )}

      {bookingStatusWindow && (
        <BookingStatusWindow
          onExit={() => {
            setBookingStatusWindow(false);
            // console.log("hello!");
          }}
        />
      )}

      {reportWindow && (
        <ReportWindow
          onExit={() => {
            setReportWindow(false);
          }}
        />
      )}*/}
    </main>
  );
}

// {
// 	"base_url": "http://localhost:3000",
// 	"bearer_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzc5MzIwNDM1LCJleHAiOjE3NzkzMjEwMzV9.MRucjVfv2JwAvcLA7BZJvQJQXnMeMKk9FwzPZaYUD_w",
// 	"userId": 1
// }
