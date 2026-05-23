"use client";
import { EntityCard } from "@/component/container/EntityContainer/EntityCard";
// import Header from "@/component/header";
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

  const [currentLocationCards, setCurrentLocationCards] = useState<
    React.ReactNode[]
  >([]);
  const [lastBookingLocationCards, setLastBookingLocationCards] = useState<
    React.ReactNode[]
  >([]);

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
              image={data.property.image}
            ></EntityCard>,
          );
          // cards.push(<SpotCard spot={data.spots} />);
        }
        stateSetter(cards);
      }
    }

    setCarousels(currentLocationSpotsResult, setCurrentLocationCards);
    setCarousels(lastBookingLocationSpotsResult, setLastBookingLocationCards);
  }, [currentLocationSpotsResult, lastBookingLocationSpotsResult]);

  return (
    <main className="bg-gradient-to-b from-white to-gray-50 min-h-screen">
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
    </main>
  );
}
