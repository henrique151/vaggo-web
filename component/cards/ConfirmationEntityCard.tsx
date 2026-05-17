import { MouseEventHandler } from "react";
import { EntityCard } from "../container/EntityContainer/EntityCard";

type componentProps = {
  title: string;
  description: string;
  onConfirm: MouseEventHandler;
  onCancel: MouseEventHandler;
  children?: React.ReactNode;
};

export default function ConfirmationEntityCard({
  title,
  description,
  children,
  onConfirm,
  onCancel,
}: componentProps) {
  return (
    <EntityCard title={title} description={description}>
      {children ? <div className="flex flex-col">{children}</div> : null}

      <div className="flex flex-row">
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
        mr-2
      "
        >
          Aceitar
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
          Recusar
        </button>
      </div>
    </EntityCard>
  );
}
