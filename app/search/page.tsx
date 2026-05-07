"use client";
import Header from "@/component/header";
import SpotCarousel from "@/component/spot_carousel";

export default function Home() {
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
            <SpotCarousel title="Pontos de interesse com base na sua localização" />

            <div className="h-16"></div>

            <SpotCarousel title="Pontos de interesse com reservas anteriores" />

            <div className="h-12"></div>
          </div>
        </div>
      </section>
    </main>
  );
}
