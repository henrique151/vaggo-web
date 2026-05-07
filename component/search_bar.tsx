"use client";

// TODO allow search bar to redirect user on the search page
// TODO implement searching parameters on search's url

export default function SearchBar() {
  return (
    <div className="w-full">
      <div
        className="
          w-full
          max-w-full
          h-14
          bg-white
          border border-gray-200
          rounded-full
          shadow-sm
          flex items-center
          px-2
          overflow-hidden
        "
      >
        {/* Onde */}
        <div className="flex-1 min-w-0 px-4">
          <p className="text-[11px] font-semibold text-gray-900">Onde</p>

          <input
            type="text"
            placeholder="Buscar vagas"
            className="
              w-full
              text-sm
              text-gray-700
              placeholder:text-gray-500
              bg-transparent
              outline-none
              truncate
            "
          />
        </div>

        {/* Divider */}
        <div className="w-px h-7 bg-gray-200 shrink-0"></div>

        {/* Quando */}
        <div className="flex-1 min-w-0 px-4">
          <p className="text-[11px] font-semibold text-gray-900">
            Horario de Disp.
          </p>

          <input
            type="text"
            placeholder="Insira a data"
            className="
              w-full
              text-sm
              text-gray-700
              placeholder:text-gray-500
              bg-transparent
              outline-none
              truncate
            "
          />
        </div>

        {/* Divider */}
        <div className="w-px h-7 bg-gray-200 shrink-0"></div>

        {/* Veículo */}
        <div className="flex-1 min-w-0 px-4">
          <p className="text-[11px] font-semibold text-gray-900">Tipo</p>

          <input
            type="text"
            placeholder="Carro ou moto?"
            className="
              w-full
              text-sm
              text-gray-700
              placeholder:text-gray-500
              bg-transparent
              outline-none
              truncate
            "
          />
        </div>

        {/* Buscar */}
        <button
          className="
            w-10 h-10
            rounded-full
            bg-gray-100
            hover:bg-gray
            text-white
            flex items-center justify-center
            transition
            shrink-0
          "
        >
          🔍
        </button>
      </div>
    </div>
  );
}
