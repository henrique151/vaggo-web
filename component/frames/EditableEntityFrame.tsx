import { useState } from "react";

interface EntityFrameProps {
  children: React.ReactNode;
  editForm?: React.ReactNode;
  // data: never;
}

export function EditableEntityFrame({
  children,
  editForm,
  // data,
}: EntityFrameProps) {
  const [showEntityEditForm, setShowEntityForm] = useState(editForm);

  return (
    <section className="border border-gray-200 rounded-2xl p-5 bg-base shadow-sm hover:shadow-md transition">
      <div className="flex items-start justify-between gap-4">
        {/*<Context.Provider value={data}>*/}
        <div className="flex-1">{children}</div>
        {/*</Context.Provider>*/}

        {editForm ? (
          // insert expression to popup editForm's window (possibly only accepts <FormCard>?)
          <button className="px-4 py-2 rounded-xl text-sm font-medium bg-gray-900 text-white hover:bg-black transition shrink-0">
            Editar
          </button>
        ) : null}

        {showEntityEditForm ? <>{editForm}</> : null}
      </div>
    </section>
  );
}
