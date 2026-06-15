"use client";
import CarouselContainer from "@/component/container/CarouselContainer";
import { EntityCard } from "@/component/container/EntityContainer/EntityCard";
import { useSearchProperties } from "@/hooks/api/property/useSearchProperties";
import { use, useEffect, useState } from "react";
import React from "react";

export const dynamic = "force-dynamic";

export default function Home({
  searchParams,
}: {
  searchParams: Promise<{ address?: string }>;
}) {
  const params = use(searchParams);
  const address = params.address ?? "";

  const [foundPropertiesData, foundPropertiesLoading, searchSuccess] =
    useSearchProperties({ address });

  const [foundPropertiesCards, setFoundPropertiesCards] = useState<
    React.ReactNode[]
  >([]);

  // Reseta cards quando uma nova busca começa
  useEffect(() => {
    if (foundPropertiesLoading) {
      setFoundPropertiesCards([]);
    }
  }, [foundPropertiesLoading]);

  useEffect(() => {
    if (foundPropertiesData && !foundPropertiesLoading && searchSuccess) {
      const spotCards: React.ReactNode[] = [];

      for (const property of foundPropertiesData.results) {
        spotCards.push(
          <EntityCard
            key={property.property.id}
            title={`${property.property.name}`}
            description={`Distância: ${property.route.distance}`}
            redirectTo={`/spot/${property.property.id}`}
            image={property.property.image}
          />,
        );
      }
      setFoundPropertiesCards(spotCards);
    }
  }, [foundPropertiesData, foundPropertiesLoading, searchSuccess]);

  const hasNoAddress = !address;

  return (
    <main className="bg-base min-h-screen">
      <section className="section-default">
        <div className="container-default mt-6">
          <div className="rounded-2xl shadow-sm p-6">
            {hasNoAddress ? (
              <div className="p-4 text-muted text-center mt-4">
                Digite um endereço ou CEP na barra de busca para encontrar vagas próximas.
              </div>
            ) : foundPropertiesLoading ? (
              <div className="p-4 text-muted text-center mt-4">
                Buscando vagas próximas...
              </div>
            ) : !searchSuccess ? (
              <div className="p-4 bg-red-50 text-red-600 rounded-lg border border-red-200 mt-4 text-center">
                Endereço não localizado. Verifique o nome da cidade ou CEP digitado e tente novamente.
              </div>
            ) : foundPropertiesCards.length === 0 ? (
              <div className="p-4 text-muted text-center mt-4">
                Nenhuma vaga encontrada para esta localização.
              </div>
            ) : (
              <CarouselContainer
                title={"Pontos mais próximos ao endereço"}
                cards={foundPropertiesCards}
              />
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
