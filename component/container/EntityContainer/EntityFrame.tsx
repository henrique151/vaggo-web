"use client";

import { MouseEventHandler, useState } from "react";
import EditWindow, { EditFormField } from "@/component/windows/EditWindow";
import BlurOverlay from "@/component/blur_overlay";
import GenericWindow from "@/component/GenericWindow";
import ControllerStatus from "@/classes/controller/ControllerStatus";
import useWindow from "@/hooks/useWindow";
import FormItem from "@/component/ui/form/FormItem";


interface EntityFrameProps {
  children: React.ReactNode;
  // Edit
  editTitle?: string;
  editFields?: EditFormField[];
  onEdit?: (formData: FormData) => void;
  // Delete
  deleteTitle?: string;
  deleteDescription?: string;
  onDelete?: () => void;
  // Reanalise
  onReanalise?: () => void;
  // Cancelar Reserva
  onCancelReservation?: () => void;
  // Suspender Vaga
  onSuspendSpot?: () => void;
  controller?: ControllerStatus;
}

export default function EntityFrame({
  children,
  editTitle,
  editFields,
  onEdit,
  deleteTitle,
  deleteDescription,
  onDelete,
  onReanalise,
  onCancelReservation,
  onSuspendSpot,
  controller,
}: EntityFrameProps) {
  const [showEdit, setShowEdit] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showReanaliseConfirm, setShowReanaliseConfirm] = useState(false);
  const [showCancelReservationConfirm, setShowCancelReservationConfirm] =
    useState(false);

  const canEdit = !!(editFields && onEdit);
  const canDelete = !!onDelete;
  const canReanalise = !!onReanalise;
  const canCancelReservation = !!onCancelReservation;
  const canSuspendSpot = !!onSuspendSpot;
  const [reanaliseWindow] = useWindow(ReanaliseWindow);
  const [cancelReservationWindow] = useWindow(CancelReservationWindow);

  function ReanaliseWindow({ onExit }: { onExit: MouseEventHandler }) {
    const [messageState, setMessageState] = useState<boolean | undefined>(
      undefined,
    );

    const [error, setError] = useState<string | null>(null);

    const handleReport = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);
      const description = formData.get("description") as string;

      if (!description || description.trim() === "") {
        setError("Este campo é obrigatório responder.");
        return;
      }

      if (description.trim().length <= 5) {
        setError("O campo deve ter no mínimo mais de 5 caracteres.");
        return;
      }

      setError(null);
      try {
        if (onReanalise) {
          const success = await onReanalise(description);
          // Define o estado baseado no retorno da API (se for false, joga pro bloco de erro)
          if (success === false) {
            setMessageState(false);
            return;
          }
        }
        setMessageState(true);
      } catch {
        setMessageState(false);
      }
    };

    const messages = {
      true: (
        <p>
          Sua reanálise foi enviada e será analisada por um de nossos
          administradores.
        </p>
      ),
      false: (
        <p>
          Houve um erro durante o envio da reanálise, tente novamente dentro
          de alguns minutos. Pedimos desculpas pelo transtorno.
        </p>
      ),
      undefined: (

        <form onSubmit={handleReport}>
          <FormItem
            type="text"
            label="Faça uma descrição do problema"
            name="description"
          />

          {error && (
            <p className="text-rose-500 text-sm font-medium mt-1 animate-pulse">
              {error}
            </p>
          )}

          <FormItem
            type="text"
            label="Qual motivo para a reanálise?"
            name="reason"
          />

          {error && (
            <p className="text-rose-500 text-sm font-medium mt-1 animate-pulse">
              {error}
            </p>
          )}

          <div className="h-4" />

          <button
            type="submit"
            className="w-full py-3 rounded-lg font-medium text-white btn-primary btn-hover transition disabled:opacity-60"
          >
            Enviar
          </button>
        </form>
      ),
    };

    return (
      <>
        <BlurOverlay show={true} onClick={() => { }} />

        <GenericWindow
          title="Reanálise"
          exitButton={true}
          onExit={reanaliseWindow.hide}
        >
          {messages[String(messageState)]}
        </GenericWindow>
      </>
    );
  }

  function CancelReservationWindow({ onExit }: { onExit: MouseEventHandler }) {
    const [messageState, setMessageState] = useState<boolean | undefined>(
      undefined,
    );

    const handleCancel = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);

      try {
        // TODO:
        // const res = await ReservationController.cancel(...);

        onCancelReservation?.();
        setMessageState(true);
      } catch {
        setMessageState(false);
      }
    };

    const messages = {
      true: <p>Sua reserva foi cancelada com sucesso.</p>,
      false: (
        <p>
          Houve um erro durante o cancelamento da reserva, tente novamente
          dentro de alguns minutos. Pedimos desculpas pelo transtorno.
        </p>
      ),
      undefined: (
        <form onSubmit={handleCancel}>
          <FormItem
            type="text"
            label="Motivo do cancelamento (opcional)"
            name="reason"
          />

          <div className="h-4" />

          <button
            type="submit"
            className="w-full py-3 rounded-lg font-medium text-white bg-rose-600 hover:bg-rose-700 transition disabled:opacity-60"
          >
            Confirmar cancelamento
          </button>
        </form>
      ),
    };

    return (
      <>
        <BlurOverlay show={true} onClick={() => { }} />

        <GenericWindow
          title="Cancelar Reserva"
          exitButton={true}
          onExit={cancelReservationWindow.hide}
        >
          {messages[String(messageState)]}
        </GenericWindow>
      </>
    );
  }

  return (
    <>
      <section className="surface-elevated rounded-2xl p-5 shadow-sm hover:shadow-md transition">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">{children}</div>

          {(canEdit || canDelete || canReanalise || canCancelReservation || canSuspendSpot) && (
            <div className="flex items-center gap-2 shrink-0">
              {canEdit && (
                <button
                  onClick={() => setShowEdit(true)}
                  className="
                    px-4 py-2
                    rounded-xl
                    text-sm
                    font-medium
                    btn-primary
                    btn-hover
                    text-white
                    transition
                    shrink-0
                  "
                >
                  Editar
                </button>
              )}

              {canReanalise && (
                <button
                  onClick={() => setShowReanaliseConfirm(true)}
                  className="
                    px-4 py-2
                    rounded-xl
                    text-sm
                    font-medium
                    bg-orange-600
                    hover:bg-orange-700
                    text-white
                    transition
                    shrink-0
                  "
                >
                  Solicitar Reanalise
                </button>
              )}

              {canCancelReservation && (
                <button
                  onClick={() => setShowCancelReservationConfirm(true)}
                  className="
                    px-4 py-2
                    rounded-xl
                    text-sm
                    font-medium
                    bg-rose-600
                    hover:bg-rose-700
                    text-white
                    transition
                    shrink-0
                  "
                >
                  Cancelar Reserva
                </button>
              )}

              {canSuspendSpot && (
                <button
                  onClick={() => onSuspendSpot?.()}
                  className="
                    px-4 py-2
                    rounded-xl
                    text-sm
                    font-medium
                    bg-rose-600
                    hover:bg-rose-700
                    text-white
                    transition
                    shrink-0
                  "
                >
                  Suspender Vaga
                </button>
              )}

              {canDelete && (
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="
                    px-4 py-2
                    rounded-xl
                    text-sm
                    font-medium
                    bg-rose-600
                    hover:bg-rose-700
                    text-white
                    transition
                    shrink-0
                  "
                >
                  Excluir
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Edit Window */}
      {canEdit && showEdit && (
        <EditWindow
          title={editTitle ?? "Editar"}
          fields={editFields!}
          onSubmit={onEdit!}
          onClose={() => setShowEdit(false)}
        />
      )}

      {/* Reanalise Confirm Window */}
      {canReanalise && showReanaliseConfirm && (
        <>
          <BlurOverlay
            show={true}
            onClick={() => setShowReanaliseConfirm(false)}
          />
          <GenericWindow
            title="Confirmar reanálise"
            exitButton={true}
            onExit={() => setShowReanaliseConfirm(false)}
          >
            <p className="text-muted mb-6 text-center">
              Tem certeza que deseja solicitar reanálise deste item?
            </p>
            <div className="flex gap-3 w-full">
              <button
                onClick={() => {
                  setShowReanaliseConfirm(false);
                  reanaliseWindow.show();
                }}
                className="
                  flex-1
                  py-3
                  rounded-xl
                  font-medium
                  text-white
                  btn-primary
                  btn-hover
                  transition
                "
              >
                Solicitar Reanalise
              </button>
              <button
                onClick={() => setShowReanaliseConfirm(false)}
                className="
                  flex-1
                  py-3
                  rounded-xl
                  font-medium
                  surface-elevated
                  text-primary
                  hover:opacity-80
                  transition
                "
              >
                Cancelar
              </button>
            </div>
          </GenericWindow>
        </>
      )}

      {/* Cancel Reservation Confirm Window */}
      {canCancelReservation && showCancelReservationConfirm && (
        <>
          <BlurOverlay
            show={true}
            onClick={() => setShowCancelReservationConfirm(false)}
          />
          <GenericWindow
            title="Confirmar cancelamento"
            exitButton={true}
            onExit={() => setShowCancelReservationConfirm(false)}
          >
            <p className="text-muted mb-6 text-center">
              Tem certeza que deseja cancelar esta reserva? Esta ação não pode
              ser desfeita.
            </p>
            <div className="flex gap-3 w-full">
              <button
                onClick={() => {
                  setShowCancelReservationConfirm(false);
                  cancelReservationWindow.show();
                }}
                className="
                  flex-1
                  py-3
                  rounded-xl
                  font-medium
                  text-white
                  bg-orange-600
                  hover:bg-orange-700
                  transition
                "
              >
                Cancelar Reserva
              </button>
              <button
                onClick={() => setShowCancelReservationConfirm(false)}
                className="
                  flex-1
                  py-3
                  rounded-xl
                  font-medium
                  surface-elevated
                  text-primary
                  hover:opacity-80
                  transition
                "
              >
                Voltar
              </button>
            </div>
          </GenericWindow>
        </>
      )}

      {/* Delete Confirm Window */}
      {canDelete && showDeleteConfirm && (
        <>
          <BlurOverlay
            show={true}
            onClick={() => setShowDeleteConfirm(false)}
          />
          <GenericWindow
            title={deleteTitle ?? "Confirmar exclusão"}
            exitButton={true}
            onExit={() => setShowDeleteConfirm(false)}
          >
            <p className="text-muted mb-6 text-center">
              {deleteDescription ??
                "Tem certeza que deseja excluir este item? Esta ação não pode ser desfeita."}
            </p>

            <div className="flex gap-3 w-full">
              <button
                onClick={() => {
                  onDelete!();
                  setShowDeleteConfirm(false);
                }}
                className="
                  flex-1
                  py-3
                  rounded-xl
                  font-medium
                  text-white
                  bg-rose-600
                  hover:bg-rose-700
                  transition
                "
              >
                Excluir
              </button>

              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="
                  flex-1
                  py-3
                  rounded-xl
                  font-medium
                  surface-elevated
                  text-primary
                  hover:opacity-80
                  transition
                "
              >
                Cancelar
              </button>
            </div>
          </GenericWindow>
        </>
      )}

      {reanaliseWindow.component && <reanaliseWindow.component />}
      {cancelReservationWindow.component && (
        <cancelReservationWindow.component />
      )}
    </>
  );
}