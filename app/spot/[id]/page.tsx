"use client";
// import Link from "next/link"
import Image from "next/image";

import Header from "@/component/header";
import * as api from "@/app/api";
import { PropertyResponse } from "@/interface/api/property";
import { MouseEventHandler, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ParkingSpotResponse } from "@/interface/api/spot";
import BlurOverlay from "@/component/blur_overlay";
import { Spot } from "@/entity/spot";
import Property, { PropertyDAO } from "@/entity/property";
import GenericWindow from "@/component/GenericWindow";
import { Vehicle, VehicleDAO } from "@/entity/vehicle";
import { BookingDAO } from "@/entity/booking";
import { DatePeriod } from "@/interface/entity";

export default function Page({ params }: any) {
  params = useParams();
  const [property, setProperty] = useState<Property>(); //TODO REPLACE WITH TYPES
  const [spots, setSpots] = useState<Spot[]>();
  const [showWindow, setShowWindow] = useState(false);
  const [vehicles, setVehicles] = useState<Vehicle[] | undefined>(undefined);

  const [showSpotsWindow, setShowSpotsWindow] = useState(false);
  const [showVehicleWindow, setShowVehicleWindow] = useState(false);

  const [selectedSpot, setSelectedSpot] = useState(-1);
  const [selectedVehicle, setSelectedVehicle] = useState(-1);

  const [bookingStatus, setBookingStatus] = useState(false);
  const [bookingStatusWindow, setBookingStatusWindow] = useState(false);

  const handleReserve = async (spotId: number, vehicleId: number) => {
    const datePeriod: DatePeriod = {
      start: new Date("2026-01-01"),
      end: new Date("2026-12-31"),
    };

    setSelectedVehicle(vehicleId);

    const res = await BookingDAO.reserve(selectedSpot, vehicleId, datePeriod);

    console.log(
      `you selected spot number ${selectedSpot} to use with car ${selectedVehicle}`,
    );

    console.log(res);

    if (res) {
      console.log("success!");
      setBookingStatus(true);
    }
    {
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
          {property.spots!.map((spot: Spot) => {
            if (spot.status != "INDISPONIVEL" && spot.status != "OCUPADA") {
              return <SpotAvailabilityCard key={spot.id} spot={spot} />;
            }
          })}
        </GenericWindow>
      </>
    );
  }

  function VehicleAvailabilityWindow({
    onExit,
  }: {
    onExit: MouseEventHandler;
  }) {
    useEffect(() => {
      const load = async () => {
        if (!vehicles) {
          const vehicles = await VehicleDAO.getFromUser();
          setVehicles(vehicles);
        }
      };

      load();

      console.log(vehicles);
    }, []);
    if (!vehicles) return <></>;
    return (
      <>
        <BlurOverlay show={true} onClick={() => {}} />
        <GenericWindow
          title={"Selecione um veículo para esta vaga"}
          exitButton={true}
          onExit={onExit}
        >
          {vehicles.map((vehicle) => {
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
          })}
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

  useEffect(() => {
    const query = async () => {
      // const data = await api.call(`properties/${params.id}`, true, {
      // dataOnly: true,
      // });
      const spotData = await api.call(
        `spots/properties/${params.id}/spots`,
        true,
        { dataOnly: true },
      );

      const data = await PropertyDAO.get(params.id, true);

      // const spotData = await PropertyDAO.getSpots()
      console.log(data);
      console.log(spotData);

      setProperty(data);
      // setSpots(spotData as ParkingSpotResponse);
    };
    query();
  }, []);

  if (property === undefined) return <section></section>;
  return (
    <main>
      <Header />

      <section className="m-10 flex flex-row">
        <section className="bg-white w-full rounded-3xl border border-gray-200 shadow-sm p-8 flex flex-row">
          <h2 className="text-2xl w-1/2  mb-6 mr-6">
            <img
              src={`${property.images[0].url}`}
              alt={"test"}
              className="
                            w-full h-full object-cover
                        "
            />
          </h2>

          <div className="flex w-1/2 flex-col items-end">
            <h1 className="text-2xl font-semibold">{property?.name}</h1>
            <p className="text-sm mb-4">{property?.type}</p>
            <p>{property.description}</p>
            <p>Capacidade total: {property.totalCapacity} Vaga(as)</p>
            <h2 className="text-2xl font-semibold mt-6">R$ 0 / Reserva</h2>

            <button
              // onClick={() => setShowWindow(true)}
              onClick={() => setShowSpotsWindow(true)}
              className=" mt-4 py-3 rounded-lg font-medium text-white bg-gray-900 hover:bg-black transition disabled:opacity-60 w-100"
            >
              Vagas Disponíveis
            </button>
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

// <section className="bg-white w-full rounded-3xl border border-gray-200 shadow-sm p-8 w-100 mb-4">
//   <h2 className="font-semibold mb-6">
//     {spot.identifier}
//   </h2>

//   <div className="flex flex-col items-end">
//     <p>{spot.status}</p>
//     <p>Tamanho: {spot.size}</p>
//     <p>{spot.allowedVehicles}</p>
//   </div>
// </section>

// <section className="w-1/2 flex flex-col">
//     <h1>Shopping Interlagos</h1>
//     <div className="flex flex-col items-end">

//         Info about user
//         <div className="flex flex-row">
//             {/* name(s) with total stars if single owner*/}
//             <div className="flex flex-col items-end">
//                 <p>{property?.name}</p>
//                 <p>0/0</p>
//             </div>

//             {/* profile picture or cascade if multiple owners */}
//             <div>

//             </div>
//         </div>

//         {/* dynamic price if planned */}
//         <div>R$15-40/Hora</div>

//         {/* availability date/hour */}
//         <div className="flex flex-col">
//             {/* Date */}
//             <div>

//             </div>
//             {/* Time */}
//             <div>

//             </div>
//         </div>

//         {/* Spot options */}
//         <div className="flex flex-row">
//             <button className="mr-3">Reservar</button>
//             <button>[Chat]</button>
//         </div>
//     </div>
// </section>
