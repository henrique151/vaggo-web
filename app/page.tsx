"use client";
import { EntityCard } from "@/component/container/EntityContainer/EntityCard";
// import Header from "@/component/header";
import { useSearchProperties } from "@/hooks/api/property/useSearchProperties";
import { SearchResult } from "@/classes/SearchResult";
import { useEffect, useState } from "react";
import CarouselContainer from "@/component/container/CarouselContainer";

import PanelContainer from "@/component/container/PanelContainer";
import Header from "@/component/header";

export default function Home() {
  const [currentLocationSpotsResult, currentLocationSpotsLoading] =
    useSearchProperties({
      address: "São Paulo",
    });
  const [lastBookingLocationSpotsResult, lastBookingLocationSpotsLoading] =
    useSearchProperties({
      address: "São Paulo",
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
    <main className="min-h-screen">
      <Header showSearch />

      <section className="section-default">
        <div className="container-default mt-6">
          <div className="max-w-5xl mx-auto">
            <div className="surface-elevated rounded-3xl p-8">
              {currentLocationCards.length > 0 ? (
                <CarouselContainer
                  title="Pontos de interesse com base na sua localização"
                  cards={currentLocationCards}
                />
              ) : (
                <PanelContainer title="Pontos de interesse com base na sua localização">
                  Carregando...
                </PanelContainer>
              )}

              <div className="h-16"></div>

              {lastBookingLocationCards.length > 0 ? (
                <CarouselContainer
                  title="Pontos de interesse com reservas anteriores"
                  cards={lastBookingLocationCards}
                />
              ) : (
                <PanelContainer title="Pontos de interesse com reservas anteriores">
                  Carregando...
                </PanelContainer>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
