"use client";
import DatePeriod from "@/classes/data/DatePeriod";
import CarouselContainer from "@/component/container/CarouselContainer";
import { EntityCard } from "@/component/container/EntityContainer/EntityCard";
// import Header from "@/component/header";
// import SpotCard from "@/component/spot_card";
// import SpotCarousel from "@/component/spot_carousel";
// import { PropertyDAO, useSearchProperties } from "@/entity/property";
import { useSearchProperties } from "@/hooks/api/property/useSearchProperties";
// import { useSearchParams } from "next/navigation";
import { use, useEffect, useState } from "react";

export const dynamic = "force-dynamic";

export default function Home({
  searchParams,
}: {
  searchParams: Promise<{ address?: string }>;
}) {
  const params = use(searchParams);
  console.log("params");
  console.log(params);

  const [foundPropertiesData, foundPropertiesLoading] = useSearchProperties({
    address: params.address ?? "",
    datePeriod: new DatePeriod(new Date(2026, 4, 10), new Date(2026, 4, 10)),
  });

  const [foundPropertiesCards, setFoundPropertiesCards] = useState<
    React.ReactNode[]
  >([]);

  useEffect(() => {
    // console.log("foundPropertiesData");
    // console.log(foundPropertiesData);
    // if (foundPropertiesData && foundPropertiesCards.length < 0) {
    if (foundPropertiesData && !foundPropertiesLoading) {
      const spotCards = [];

      for (const property of foundPropertiesData.results) {
        console.log("property");
        console.log(property);
        spotCards.push(
          <EntityCard
            title={`${property.property.name}`}
            description={`Distância: ${property.route.distance}`}
            redirectTo={`/spot/${property.property.id}`}
            image={property.property.image}
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
      {/*<Header showSearch />*/}

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
