import GenericWindow from "../GenericWindow";

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
