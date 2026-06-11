"use client";

import { useState } from "react";
import EditWindow, { EditFormField } from "@/component/windows/EditWindow";
import BlurOverlay from "@/component/blur_overlay";
import GenericWindow from "@/component/GenericWindow";
import ControllerStatus from "@/classes/controller/ControllerStatus";

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
  controller,
}: EntityFrameProps) {
  const [showEdit, setShowEdit] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const canEdit = !!(editFields && onEdit);
  const canDelete = !!onDelete;

  return (
    <>
      <section className="surface-elevated rounded-2xl p-5 shadow-sm hover:shadow-md transition">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">{children}</div>

          {(canEdit || canDelete) && (
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
    </>
  );
}
