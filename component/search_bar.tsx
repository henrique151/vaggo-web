"use client";

import { useRouter, useSearchParams } from "next/navigation";

// TODO allow search bar to redirect user on the search page
// TODO implement searching parameters on search's url

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const search = () => {
    const params = new URLSearchParams(searchParams);
    const address = (
      document.getElementById("search_bar_address") as HTMLInputElement
    ).value;

    if (address) params.set("address", address);

    // router.push("/search");
    router.push(`/search?${params.toString()}`);
    router.refresh();
    // const address = document.getElementById('seach_bar_address')!.innerText
    // const address = document.getElementById('seach_bar_address')!.innerText
  };

  return (
    <div className="w-fit">
      <div
        className="
          w-full
          h-14

          surface-elevated

          rounded-full

          flex items-center
          px-2

          overflow-hidden
      "
      >
        {/* Onde */}
        <div className="flex-1 min-w-0 px-4">
          <p className="text-[11px] font-semibold text-primary">Onde</p>

          <input
            type="text"
            placeholder="Buscar vagas"
            id="search_bar_address"
            className="
          w-full

          text-sm
          text-muted

          placeholder:text-subtle

          bg-transparent
          outline-none

          truncate
        "
          />
        </div>

        {/* Divider */}
        {/*<div className="w-px h-7 bg-surface border-soft shrink-0"></div>*/}

        {/* Quando */}
        {/*<div className="flex-1 min-w-0 px-4">
          <p className="text-[11px] font-semibold text-primary">
            Horário de Disp.
          </p>

          <input
            type="text"
            placeholder="Insira a data"
            className="
          w-full

          text-sm
          text-muted

          placeholder:text-subtle

          bg-transparent
          outline-none

          truncate
        "
          />
        </div>*/}

        {/* Divider */}
        {/*<div className="w-px h-7 bg-surface border-soft shrink-0"></div>*/}

        {/* Tipo */}
        {/*<div className="flex-1 min-w-0 px-4">
          <p className="text-[11px] font-semibold text-primary">
            Tipo
          </p>

          <input
            type="text"
            placeholder="Carro ou moto?"
            className="
          w-full

          text-sm
          text-muted

          placeholder:text-subtle

          bg-transparent
          outline-none

          truncate
        "
          />
        </div>*/}

        {/* Buscar */}
        <button
          onClick={search}
          className="
        app-icon-button

        bg-surface
        border-base

        text-primary

        hover:bg-card-hover

        shrink-0
      "
        >
          🔍
        </button>
      </div>
    </div>
  );
}
