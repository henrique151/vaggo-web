/* eslint-disable @next/next/no-img-element */
"use client";

import { Image } from "@/interface/media";
import Link from "next/link";
import { useEffect } from "react";

interface Spot {
  spotId: number;
  propertyName: string;
  propertyId: number;
  images: Image;
  timeStart: string;
  timeEnd: string;
  price: string;
  size: string;
}

interface SpotProps {
  spot: Spot;
}

export default function SpotCard({ spot }: SpotProps) {
  // console.log(spot.images);
  return (
    <div
      className="
      w-[260px]
      bg-white
      border border-gray-200
      rounded-2xl
      shadow-sm
      overflow-hidden
      hover:shadow-md
      transition
    "
    >
      {/* Imagem */}
      <div className="w-full h-[160px] overflow-hidden">
        {/* TODO change to <Image> */}
        <img
          src={`${spot.images.url}`}
          alt={spot.propertyName}
          className="
            w-full h-full object-cover
            hover:scale-105
            transition duration-300
          "
        />
      </div>

      {/* Conteúdo */}
      <div className="p-4">
        <Link href={`/spot/${spot.propertyId}`}>
          <h3
            className="
            font-semibold
            text-lg
            text-gray-900
            hover:text-black
            transition
          "
          >
            {spot.propertyName}
          </h3>
        </Link>

        <p className="text-sm text-gray-500 mt-1">{spot.timeStart}</p>

        <p className="text-gray-900 font-semibold mt-3">{spot.price}</p>
      </div>
    </div>
  );
}
