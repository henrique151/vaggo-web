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
        text-primary
        transition-colors
        hover:text-sky-600
        dark:hover:text-sky-400
      "
    >
      {title}
    </h3>
  );

  // console.log("image");
  // console.log(image);

  return (
    <div
      className="
        w-65

        bg-card
        border
        border-base

        rounded-2xl

        shadow-sm
        hover:shadow-md

        transition-all
      "
    >
      {/* Imagem */}
      {image && (
        <div className="w-full h-[160px] overflow-hidden">
          <Image
            src={image.url}
            width={400}
            height={400}
            alt="Card name"
            className="
              w-full
              h-full
              object-cover

              rounded-t-2xl

              hover:scale-105
              transition-transform
              duration-300
            "
          />
        </div>
      )}

      {/* Conteúdo */}
      <div className="p-4">
        {redirectTo ? (
          <Link href={redirectTo}>{titleFragment}</Link>
        ) : (
          titleFragment
        )}

        <p className="text-sm text-muted mt-1">{description}</p>

        <div
          className="
            text-primary
            font-semibold
            mt-3
          "
        >
          {children}
        </div>
      </div>
    </div>
  );
}
