"use client";
import CarouselContainer from "@/component/container/CarouselContainer";
import { EntityCard } from "@/component/container/EntityCard";
import Header from "@/component/header";
// import SpotCard from "@/component/spot_card";
// import SpotCarousel from "@/component/spot_carousel";
// import { PropertyDAO, useSearchProperties } from "@/entity/property";
import { useSearchProperties } from "@/hooks/api/property/useSearchProperties";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const params = useSearchParams();

  const [foundPropertiesData, foundPropertiesLoading] = useSearchProperties({
    address: params.get("address") != null ? params.get("address")! : "",
  });

  const [foundPropertiesCards, setFoundPropertiesCards] = useState<
    (typeof EntityCard)[]
  >([]);

  useEffect(() => {
    console.log("foundPropertiesData");
    console.log(foundPropertiesData);
    // if (foundPropertiesData && foundPropertiesCards.length < 0) {
    if (foundPropertiesData && !foundPropertiesLoading) {
      const spotCards = [];

      for (const property of foundPropertiesData.results) {
        console.log("property");
        console.log(property);
        spotCards.push(
          <EntityCard
            title={`Propriedade #${property.propertyId}`}
            description={`Distância: ${property.route.distance}`}
            redirectTo={`/spot/${property.propertyId}`}
          ></EntityCard>,
        );
      }
      console.log(spotCards);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFoundPropertiesCards(spotCards);
    }
  }, [foundPropertiesData]);

  // get spots nearby search with PropertyDAO.search(query.search)
  // list result in container
  // create generic container for storing those data efficiently?
  //

  return (
    <main className="bg-gradient-to-b from-white to-gray-50 min-h-screen">
      <Header showSearch />

      <section className="section-default">
        <div className="container-default mt-6">
          <div className="rounded-2xl shadow-sm p-6">
            {/*<SpotCarousel
              title="Pontos mais próximos ao endereço"
              spotCards={foundPropertiesData}
            />*/}
            <CarouselContainer
              title={"Pontos mais próximos ao endereço"}
              cards={foundPropertiesCards}
            />
            {/*<SpotCard spot={spot} />*/}

            {/*{spots.map((spot:any) => (
              <div key={spot.id} className="min-w-[260px]">
                <SpotCard spot={spot} />
              </div>
            ))}*/}

            {/*<div className="h-16"></div>*/}

            {/*<SpotCarousel title="Pontos de interesse com reservas anteriores" />*/}

            {/*<div className="h-12"></div>*/}
          </div>
        </div>
      </section>
    </main>
  );
}
