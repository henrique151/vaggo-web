"use client";
import Header from "@/component/header";
import SpotCard from "@/component/spot_card";
import SpotCarousel from "@/component/spot_carousel";
import { PropertyDAO } from "@/entity/property";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [foundProperties, setFoundProperties] = useState<(typeof SpotCard)[]>(
    [],
  );
  const params = useSearchParams();

  useEffect(() => {
    async function load() {
      const parsedParams = {} as Record<string, string>;

      for (const [key, value] of params.entries()) {
        parsedParams[key] = value;
      }
      console.log(parsedParams);

      const res = await PropertyDAO.search(parsedParams);

      if (!res) return undefined;

      const spotCards = [];
      for (const property of res.results) {
        console.log(property);
        spotCards.push(<SpotCard spot={property} />);
      }
      console.log(res);
      setFoundProperties(spotCards);
    }
    load();
  }, []);

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
            <SpotCarousel
              title="Pontos mais próximos ao endereço"
              spotCards={foundProperties}
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
