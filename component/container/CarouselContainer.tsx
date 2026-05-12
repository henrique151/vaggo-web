"use client";

import { useEffect, useState } from "react";
// import SpotCard from "./spot_card";
import * as api from "@/app/api";
import { PropertyResponse } from "interface://api/property";
import { ParkingSpotResponse } from "@/interface/api/spot";
import { DataResponse } from "@/interface/api/api";

interface SpotCarouselProps {
  title: string;
  // children: React.ReactNode;
  cards: React.ReactNode[];
}

export default function CarouselContainer({
  title,
  cards = [],
}: SpotCarouselProps) {
  const [index, setIndex] = useState(0);

  const CARD_WIDTH = 260;
  const GAP = 12;
  const STEP = CARD_WIDTH + GAP;

  const visibleCards = 3;
  const maxIndex = cards.length - visibleCards;

  const next = () => index < maxIndex && setIndex(index + 1);
  const prev = () => index > 0 && setIndex(index - 1);

  return (
    <section className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>

        <div className="flex gap-2">
          <button
            onClick={prev}
            disabled={index === 0}
            className="
              w-8 h-8
              rounded-full
              bg-white
              border border-gray-200
              shadow-sm
              hover:bg-gray-50
              disabled:opacity-30
            "
          >
            ‹
          </button>

          <button
            onClick={next}
            disabled={index === maxIndex}
            className="
              w-8 h-8
              rounded-full
              bg-white
              border border-gray-200
              shadow-sm
              hover:bg-gray-50
              disabled:opacity-30
            "
          >
            ›
          </button>
        </div>
      </div>

      {/* Slides */}
      <div className="overflow-hidden">
        <div
          className="flex gap-3 transition-transform duration-300"
          style={{
            transform: `translateX(-${index * STEP}px)`,
          }}
        >
          {cards.map((card) => {
            return <>{card}</>;
          })}
        </div>
      </div>
    </section>
  );
}
