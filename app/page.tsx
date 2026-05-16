"use client";
import EntityFrame, { EntityCard } from "@/component/container/EntityCard";
import Header from "@/component/header";
import SpotCard from "@/component/spot_card";
import SpotCarousel from "@/component/spot_carousel";
// import {
//   PropertyDAO,
//   PropertySearchResult,
//   // SearchResult,
//   // useSearchProperties,
// } from "@/entity/property";
import { useSearchProperties } from "@/hooks/api/property/useSearchProperties";
import { SearchResult } from "@/classes/SearchResult";
import { useEffect, useState } from "react";

export default function Home() {
  const [currentLocationSpotsResult, currentLocationSpotsLoading] =
    useSearchProperties({ address: "São Paulo" });
  const [lastBookingLocationSpotsResult, lastBookingLocationSpotsLoading] =
    useSearchProperties({ address: "São Paulo" });

  const [currentLocationCards, setCurrentLocationCards] = useState<
    (typeof SpotCard)[]
  >([]);
  const [lastBookingLocationCards, setLastBookingLocationCards] = useState<
    (typeof SpotCard)[]
  >([]);

  // useEffect(() => {
  //   async function load(searchString: string, setter: CallableFunction) {
  //     const res = await PropertyDAO.search({ address: searchString });

  //     if (!res) return undefined;

  //     const spotCards = [];
  //     for (const property of res.results) {
  //       console.log(property);
  //       spotCards.push(<SpotCard spot={property} />);
  //     }
  //     console.log(res);
  //     setter(spotCards);
  //   }
  //   load("São Paulo", setCurrentLocationSpots);
  //   load("São Paulo", setLastBookingLocationSpots);
  // }, []);

  useEffect(() => {
    function setCarousels(
      iterator: SearchResult | undefined,
      stateSetter: any,
    ) {
      if (iterator) {
        console.log("iterator");
        console.log(iterator);
        const cards = [];
        for (const data of iterator.results) {
          console.log(data);
          cards.push(
            <EntityCard
              title={`Propriedade #${data.propertyId}`}
              description={`Distância: ${data.route.distance}`}
              redirectTo={`/spot/${data.propertyId}`}
            ></EntityCard>,
          );
          // cards.push(<SpotCard spot={data.spots} />);
        }
        stateSetter(cards);
      }
    }

    setCarousels(currentLocationSpotsResult, setCurrentLocationCards);
    setCarousels(lastBookingLocationSpotsResult, setLastBookingLocationCards);

    // if (lastBookingLocationSpotsResult) {
    //   const cards = [];
    //   for (const property of lastBookingLocationSpotsResult.results) {
    //     console.log(property);
    //     cards.push(<SpotCard spot={property} />);
    //   }
    //   // eslint-disable-next-line react-hooks/set-state-in-effect
    //   setLastBookingLocationCards(cards);
    // }
  }, [currentLocationSpotsResult, lastBookingLocationSpotsResult]);

  return (
    <main className="bg-gradient-to-b from-white to-gray-50 min-h-screen">
      <Header showSearch />

      <section className="section-default">
        <div className="container-default mt-6">
          <div className="rounded-2xl shadow-sm p-6">
            <SpotCarousel
              title="Pontos de interesse com base na sua localização"
              spotCards={currentLocationCards}
            />

            <div className="h-16"></div>

            <SpotCarousel
              title="Pontos de interesse com reservas anteriores"
              spotCards={lastBookingLocationCards}
            />

            <div className="h-12"></div>
          </div>
        </div>
      </section>
    </main>
  );
}
