"use client";

import { useEffect, useState } from "react";
import SpotCard from "./spot_card";
// import * as api from "@/app/api";
// import { PropertyResponse } from "interface://api/property";
// import { ParkingSpotResponse } from "@/interface/api/spot";
// import { DataResponse } from "@/interface/api/api";

interface SpotCarouselProps {
  title: string;
  // children: React.ReactNode;
  spotCards: (typeof SpotCard)[];
}

export default function SpotCarousel({
  title,
  spotCards = [],
}: SpotCarouselProps) {
  const [index, setIndex] = useState(0);
  // const [spots, setSpots] = useState<(typeof SpotCard)[]>([]);

  const CARD_WIDTH = 260;
  const GAP = 12;
  const STEP = CARD_WIDTH + GAP;

  // const spots_decoy = [
  //   { id: 1, name: "Shopping Interlagos", time: "Seg-Sex • 10h às 18h", price: "R$ 120 / diária" },
  //   { id: 2, name: "Parking Center", time: "24 horas", price: "R$ 80 / diária" },
  //   { id: 3, name: "Estaciona SP", time: "Seg-Sáb • 8h às 20h", price: "R$ 100 / diária" },
  //   { id: 4, name: "Smart Park", time: "24 horas", price: "R$ 90 / diária" },
  //   { id: 5, name: "Royal Parking", time: "Seg-Dom • 6h às 22h", price: "R$ 110 / diária" }
  // ]

  // const spotsTest = [];

  // useEffect(() => {
  //   const query = async () => {
  //     const data = (await api.call("properties", true, {
  //       dataOnly: true,
  //     })) as PropertyResponse[];
  //     console.log(data);

  //     if (!data) return null;

  //     var spots: any = [];

  //     for (const property of data) {
  //       let currentProperty = {
  //         id: property.id,
  //         name: property.name,
  //         time: "",
  //         price: "",
  //       };

  //       api
  //         .call(`spots/properties/${currentProperty.id}/spots`, true, {
  //           dataOnly: true,
  //         })
  //         .then((data: any) => {
  //           if (data) {
  //             let spots: ParkingSpotResponse[] = data;

  //             var availableTimeList: string[] = [];

  //             var timeMap: any = {
  //               segunda_a_sexta: "Seg-Sex ",
  //               sabado: "Sábado ",
  //               domingo: "Domingo",
  //             };

  //             for (const spot of spots) {
  //               console.log(spot);
  //               for (const time of Object.keys(spot.operatingHours)) {
  //                 if (time in timeMap && !availableTimeList.includes(time)) {
  //                   availableTimeList.push(time);
  //                   currentProperty.time += timeMap[time];
  //                 }
  //               }

  //               // console.log(availableTime)
  //             }
  //           }
  //         });

  //       currentProperty.price = "R$0 / Reserva";
  //       spots.push(currentProperty);
  //     }

  //     console.log(spots);

  //     setSpots(spots);

  //     // const test = data.map((property) => {
  //     //   let currentProperty = {
  //     //     id: property.id,
  //     //     name: property.name,
  //     //     time: "",
  //     //     price: ""
  //     //   }

  //     //   // var availableTime = ""
  //     //   var availablePrice = "R$0 / Reserva"

  //     //   api.call(`spots/properties/${currentProperty.id}/spots`, true, {dataOnly: true})
  //     //   .then((data:any) => {
  //     //     if (data) {
  //     //       let spots : ParkingSpotResponse[] = data

  //     //       var availableTimeList:string[] = []

  //     //       var timeMap:any = {
  //     //         "segunda_a_sexta" : "Seg-Sex ",
  //     //         "sabado" : "Sábado ",
  //     //         "domingo" : "Domingo",
  //     //       }

  //     //       for (const spot of spots) {

  //     //         console.log(spot)
  //     //         for (const time of Object.keys(spot.operatingHours)) {
  //     //           if (time in timeMap && !availableTimeList.includes(time)) {
  //     //             availableTimeList.push(time)
  //     //             currentProperty.time += timeMap[time]
  //     //           }

  //     //         }

  //     //         // console.log(availableTime)
  //     //       }
  //     //     }
  //     //   })

  //     //   // console.log("sdijasd" + availableTimeList)

  //     //   // currentProperty.time = availableTime
  //     //   currentProperty.price = availablePrice
  //     //   return currentProperty
  //     // })
  //     // console.log(test)
  //     // setSpots(test)
  //   };
  //   query();
  // }, []);

  const visibleCards = 3;
  const maxIndex = spotCards.length - visibleCards;

  const next = () => index < maxIndex && setIndex(index + 1);
  const prev = () => index > 0 && setIndex(index - 1);

  // if (!spots) return <></>
  return (
    <section className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>

        <div className="flex gap-2">
          <button
            onClick={prev}
            disabled={index === 0}
            className="
              w-8 h-8
              rounded-full
              bg-white
              border border-gray-200
              shadow-sm
              hover:bg-gray-50
              disabled:opacity-30
            "
          >
            ‹
          </button>

          <button
            onClick={next}
            disabled={index === maxIndex}
            className="
              w-8 h-8
              rounded-full
              bg-white
              border border-gray-200
              shadow-sm
              hover:bg-gray-50
              disabled:opacity-30
            "
          >
            ›
          </button>
        </div>
      </div>

      {/* Slides */}
      <div className="overflow-hidden">
        <div
          className="flex gap-3 transition-transform duration-300"
          style={{
            transform: `translateX(-${index * STEP}px)`,
          }}
        >
          {spotCards.map((spot) => {
            return <>{spot}</>;
          })}
          {/*{spotCards}*/}
          {/*{spots.map((spot: any) => (
            <div key={spot.id} className="min-w-[260px]">
              <SpotCard spot={spot} />
            </div>
          ))}*/}
        </div>
      </div>
    </section>
  );
}
