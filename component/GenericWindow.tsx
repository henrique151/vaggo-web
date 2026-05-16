import React, { MouseEventHandler } from "react";

export default function GenericWindow({
  title,
  onExit,
  exitButton = true,
  children,
}: {
  title: string;
  exitButton: boolean;
  onExit: MouseEventHandler;
  children: React.ReactNode;
}) {
  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        px-4
      "
    >
      <div className="relative w-1/2">
        <section className="bg-white w-full rounded-3xl border border-gray-200 shadow-sm p-8 flex flex-col">
          <h2 className="text-2xl w-1/2  mb-6 mr-6">{title}</h2>

          <div className="flex flex-col w-[100%] items-center">{children}</div>
        </section>

        {/* Fechar */}
        <button
          onClick={onExit}
          className="
            absolute -top-3 -right-3
            w-9 h-9
            rounded-full
            bg-white
            border border-gray-200
            shadow-md
            hover:bg-gray-100
            transition
          "
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export function ConfirmWindow({
  title,
  description,
  onConfirm,
  onCancel,
}: {
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <GenericWindow title={title} exitButton={false} onExit={() => {}}>
      <p>{description}</p>
      <section className="flex flex-row">
        <button
          onClick={onConfirm}
          className="
            mt-4
            py-3
            rounded-lg
            font-medium
            text-white
            bg-gray-900
            hover:bg-black
            transition
            disabled:opacity-60
            w-full
          "
        >
          OK
        </button>
        <button
          onClick={onCancel}
          className="
            mt-4
            py-3
            rounded-lg
            font-medium
            text-white
            bg-gray-900
            hover:bg-black
            transition
            disabled:opacity-60
            w-full
          "
        >
          Cancelar
        </button>
      </section>
    </GenericWindow>
  );
}
