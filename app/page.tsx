"use client";
import Header from "@/component/header";
import SpotCard from "@/component/spot_card";
import SpotCarousel from "@/component/spot_carousel";
import { PropertyDAO } from "@/entity/property";
import { useEffect, useState } from "react";

export default function Home() {
  const [currentLocationSpots, setCurrentLocationSpots] = useState<
    (typeof SpotCard)[]
  >([]);
  const [lastBookingLocationSpots, setLastBookingLocationSpots] = useState<
    (typeof SpotCard)[]
  >([]);

  useEffect(() => {
    async function load(searchString: string, setter: CallableFunction) {
      const res = await PropertyDAO.search({ address: searchString });

      if (!res) return undefined;

      const spotCards = [];
      for (const property of res.results) {
        console.log(property);
        spotCards.push(<SpotCard spot={property} />);
      }
      console.log(res);
      setter(spotCards);
    }
    load("São Paulo", setCurrentLocationSpots);
    load("São Paulo", setLastBookingLocationSpots);
  }, []);

  return (
    <main className="bg-gradient-to-b from-white to-gray-50 min-h-screen">
      <Header showSearch />

      <section className="section-default">
        <div className="container-default mt-6">
          <div className="rounded-2xl shadow-sm p-6">
            <SpotCarousel
              title="Pontos de interesse com base na sua localização"
              spotCards={currentLocationSpots}
            />

            <div className="h-16"></div>

            <SpotCarousel
              title="Pontos de interesse com reservas anteriores"
              spotCards={lastBookingLocationSpots}
            />

            <div className="h-12"></div>
          </div>
        </div>
      </section>
    </main>
  );
}
