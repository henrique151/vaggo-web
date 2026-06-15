"use client";
import CarouselContainer from "@/component/container/CarouselContainer";
import { EntityCard } from "@/component/container/EntityContainer/EntityCard";
import { useSearchProperties } from "@/hooks/api/property/useSearchProperties";
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

  const [foundPropertiesData, foundPropertiesLoading, searchSuccess] = useSearchProperties({
    address: params.address ?? "",
  });

  const [foundPropertiesCards, setFoundPropertiesCards] = useState<
    React.ReactNode[]
  >([]);

  useEffect(() => {
    // console.log("foundPropertiesData");
    // console.log(foundPropertiesData);
    // if (foundPropertiesData && foundPropertiesCards.length < 0) {
    if (foundPropertiesData && !foundPropertiesLoading && searchSuccess) {
      const spotCards = [];

      for (const property of foundPropertiesData.results) {
        console.log("property");
        console.log(property);
        spotCards.push(
          <EntityCard
            key={property.property.id}
            title={`${property.property.name}`}
            description={`Distância: ${property.route.distance}`}
            redirectTo={`/spot/${property.property.id}`}
            image={property.property.image}
          ></EntityCard>,
        );
      }
      console.log(spotCards);
      setFoundPropertiesCards(spotCards);
    }
  }, [foundPropertiesData, foundPropertiesLoading, searchSuccess]);

  // get spots nearby search with PropertyDAO.search(query.search)
  // list result in container
  // create generic container for storing those data efficiently?
  //

  return (
    <main className="bg-base min-h-screen">
      {/*<Header showSearch />*/}

      <section className="section-default">
        <div className="container-default mt-6">
          <div className="rounded-2xl shadow-sm p-6">
            {/*<SpotCarousel
              title="Pontos mais próximos ao endereço"
              spotCards={foundPropertiesData}
            />*/}
            {!foundPropertiesLoading && !searchSuccess ? (
              <div className="p-4 bg-red-50 text-red-600 rounded-lg border border-red-200 mt-4 text-center">
                Não encontramos essa cidade ou CEP. Verifique o número/nome digitado e tente novamente.
              </div>
            ) : !foundPropertiesLoading && foundPropertiesCards.length === 0 ? (
              <div className="p-4 text-muted text-center mt-4">
                Nenhuma vaga encontrada para esta localização.
              </div>
            ) : (
              <CarouselContainer
                title={"Pontos mais próximos ao endereço"}
                cards={foundPropertiesCards}
              />
            )}
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
