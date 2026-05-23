// // component/entity_card.tsx
// 'use client'

import { Image as ImageObject } from "@/classes/data/Image";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
// import Image from "next/image";

type componentProps = {
  title: string;
  description: string;
  redirectTo?: string;
  image?: ImageObject;
  children?: React.ReactNode;
};

export function EntityCard({
  title,
  description,
  redirectTo,
  image,
  children,
}: componentProps) {
  const titleFragment = (
    <h3
      className="
    font-semibold
    text-lg
    text-gray-900
    hover:text-black
    transition
  "
    >
      {title}
    </h3>
  );

  return (
    <div
      className="
      w-65
      bg-white
      border border-gray-200
      rounded-2xl
      shadow-sm
      hover:shadow-md
      transition
    "
      // overflow-hidden # this one keeps messy
    >
      {/*Imagem */}
      {image ? (
        <div className="w-full h-[160px] overflow-hidden">
          {/* TODO change to <Image> */}
          <Image
            src={`${image.url}`}
            // src={`/`}
            width={400}
            height={400}
            alt={"Card name"}
            className="
              w-full h-full object-cover
              hover:scale-105
              transition duration-300
              rounded-t-2xl
            "
          />
          {/*<img
            src={`${image.url}`}
            // src={`/`}
            alt={"Card name"}
            className="
            w-full h-full object-cover
            hover:scale-105
            transition duration-300
            rounded-t-2xl

          "
          />*/}
        </div>
      ) : null}

      {/* Conteúdo */}
      <div className="p-4">
        {redirectTo ? (
          <Link href={`${redirectTo}`}>{titleFragment}</Link>
        ) : (
          titleFragment
        )}

        <p className="text-sm text-gray-500 mt-1">{description}</p>

        <div className="text-gray-900 font-semibold mt-3">{children}</div>
      </div>
    </div>
  );
}
