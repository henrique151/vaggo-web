"use client";
import VLibras from "vlibras-nextjs/dist/types";

export default function VLibrasPlugin() {
  return <div>{<VLibras forceOnload />}</div>;
}
