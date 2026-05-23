"use client";
import { EntityCard } from "@/component/container/EntityContainer/EntityCard";
import Header from "@/component/header";
import { useSearchProperties } from "@/hooks/api/property/useSearchProperties";
import { SearchResult } from "@/classes/SearchResult";
import { useEffect, useState } from "react";
import CarouselContainer from "@/component/container/CarouselContainer";
import DatePeriod from "@/classes/data/DatePeriod";

export default function Home() {
  const [currentLocationSpotsResult, currentLocationSpotsLoading] =
    useSearchProperties({
      address: "São Paulo",
      datePeriod: new DatePeriod(new Date(2026, 4, 10), new Date(2026, 4, 10)),
    });
  const [lastBookingLocationSpotsResult, lastBookingLocationSpotsLoading] =
    useSearchProperties({
      address: "São Paulo",
      datePeriod: new DatePeriod(new Date(2026, 4, 10), new Date(2026, 4, 10)),
    });

  const [currentLocationCards, setCurrentLocationCards] = useState<Element[]>(
    [],
  );
  const [lastBookingLocationCards, setLastBookingLocationCards] = useState<
    Element[]
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
              title={`Propriedade ${data.property.name}`}
              description={`Distância: ${data.route.distance}`}
              redirectTo={`/spot/${data.property.id}`}
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
      {/*<Header showSearch />*/}

      <section className="section-default">
        <div className="container-default mt-6">
          <div className="rounded-2xl shadow-sm p-6">
            <CarouselContainer
              title="Pontos de interesse com base na sua localização"
              cards={currentLocationCards}
            />

            <div className="h-16"></div>

            <CarouselContainer
              title="Pontos de interesse com reservas anteriores"
              cards={lastBookingLocationCards}
            />

            <div className="h-12"></div>
          </div>
        </div>
      </section>
      <div className="h-12"></div>

      {/*<div className="border-b-4 p-4">*/}
      {/*Your content with a bottom border shadow*/}
      {/*</div>*/}
    </main>
  );
}
