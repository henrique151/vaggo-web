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

  const [showSpotsWindow, setShowSpotsWindow] = useState(false);
  const [showVehicleWindow, setShowVehicleWindow] = useState(false);

  const [selectedSpot, setSelectedSpot] = useState(-1);
  const [selectedVehicle, setSelectedVehicle] = useState(-1);

  const [bookingStatus, setBookingStatus] = useState(false);
  const [bookingStatusWindow, setBookingStatusWindow] = useState(false);

  console.log(property);

  useEffect(() => {
    const load = async () => {
      setSpots(await getSpotsByPropertyId(params.id));
    };
    load();
  }, []);

  const handleReserve = async (spotId: number, vehicleId: number) => {
    const datePeriod = new DatePeriod(
      new Date(2026, 0, 1),
      new Date(2026, 11, 31),
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
    setShowVehicleWindow(false);
    setBookingStatusWindow(true);

    // return res;
  };

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

  function SpotAvailabilityCard({ spot }: { spot: Spot }) {
    return (
      <section className="bg-white w-full rounded-3xl border border-gray-200 shadow-sm p-8 w-100 mb-4">
        <h2 className="font-semibold mb-6">{spot.identifier}</h2>

        <div className="flex flex-col items-end">
          <p>{spot.status}</p>
          <p>Tamanho: {spot.size}</p>
          <p>{spot.allowedVehicles}</p>
        </div>

        <button
          onClick={() => {
            setSelectedSpot(spot.id);
            setShowSpotsWindow(false);
            setShowVehicleWindow(true);
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
          Solicitar Reserva
          {/* Disable button press if user already requested booking */}
        </button>
      </section>
    );
  }

  function SpotAvailabilityWindow({
    property,
    onExit,
  }: {
    property: Property;
    onExit: MouseEventHandler;
  }) {
    return (
      <>
        <BlurOverlay show={true} onClick={() => {}} />
        <GenericWindow
          title={"Vagas Disponíveis"}
          exitButton={true}
          onExit={onExit}
        >
          {/* TODO insert scroll here */}
          <section className="overflow-y-scroll scroll-smooth h-64">
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
          onExit={onExit}
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
          onExit={onExit}
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

  if (property === undefined) return <section></section>;
  return (
    <main>
      {/*<Header />*/}
      <section className="m-10 flex flex-row">
        <section className="bg-white w-full rounded-3xl border border-gray-200 shadow-sm p-8 flex flex-row">
          <h2 className="text-2xl w-1/2  mb-6 mr-6">
            {property?.images[0] ? (
              <Image
                width={128}
                height={128}
                src={`${property.images[0]}`}
                alt={"Imagem da Propriedade"}
                className="
                  w-full h-full object-cover
              "
              />
            ) : null}
          </h2>

          <div className="flex w-1/2 flex-col items-end">
            <Link className="text-sm text-red-300 mb-3" href={"/"}>
              Denunciar
            </Link>

            <h1 className="text-2xl font-semibold">{property?.name}</h1>
            <p className="text-sm mb-4 text-gray-400">{property?.type}</p>
            <p>{property?.description}</p>
            <p>Capacidade total: {property?.totalCapacity} Vaga(as)</p>
            <p>Avaliação: 0/5</p>

            {/* TODO get all spots prices, return minnimum and maximum value of each one */}
            <h2 className="text-2xl font-semibold mt-6">R$ 0 / Reserva</h2>

            {/* TODO responsive: make buttons go down each other when resizing to small screen */}
            <div className="grid grid-cols-2 w-full mt-3">
              <button
                // onClick={() => setShowWindow(true)}
                onClick={() => setShowSpotsWindow(true)}
                className="w-full py-3 rounded-lg font-medium text-white bg-gray-900 hover:bg-black transition disabled:opacity-60"
              >
                Vagas Disponíveis
              </button>
              <Link href={`${params.id}/chat`} className="ml-2">
                <button
                  // onClick={() => setShowWindow(true)}
                  className="w-full py-3 rounded-lg font-medium text-white bg-gray-900 hover:bg-black transition disabled:opacity-60"
                >
                  Conversar
                </button>
              </Link>
            </div>
          </div>
        </section>
      </section>

      {showSpotsWindow && (
        <SpotAvailabilityWindow
          property={property}
          onExit={() => {
            setShowSpotsWindow(false);
            // console.log("hello!");
          }}
        />
      )}

      {showVehicleWindow && (
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
    </main>
  );
}

// {
// 	"base_url": "http://localhost:3000",
// 	"bearer_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzc5MzIwNDM1LCJleHAiOjE3NzkzMjEwMzV9.MRucjVfv2JwAvcLA7BZJvQJQXnMeMKk9FwzPZaYUD_w",
// 	"userId": 1
// }
