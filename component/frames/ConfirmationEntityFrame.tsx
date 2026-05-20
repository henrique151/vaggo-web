import { MouseEventHandler } from "react";
import EntityFrame from "../container/EntityContainer/EntityFrame";
import DefaultEntityFrame from "./DefaultEntityFrame";

type componentProps = {
  title: string;
  description: string;
  onConfirm: MouseEventHandler<HTMLButtonElement>;
  onCancel: MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
};

export default function ConfirmationEntityFrame({
  title,
  description,
  onConfirm,
  onCancel,
  children,
}: componentProps) {
  return (
    <EntityFrame>
      <DefaultEntityFrame title={title} description={description} />

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
    </EntityFrame>
  );
}
