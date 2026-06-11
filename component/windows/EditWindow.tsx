"use client";

import { HTMLInputTypeAttribute } from "react";
import BlurOverlay from "@/component/blur_overlay";
import GenericWindow from "@/component/GenericWindow";
import FormContainer from "@/component/container/FormContainer";
import FormItem from "@/component/ui/form/FormItem";

// Mirrors the FormItem props but without className (managed internally)
export type EditFormField = {
  label: string;
  name: string;
  type?: HTMLInputTypeAttribute | "select";
  placeholder?: string;
  required?: boolean;
  items?: { value: string; label: string }[];
  defaultValue?: string;
};

type EditWindowProps = {
  title: string;
  fields: EditFormField[];
  onSubmit: (formData: FormData) => void;
  onClose: () => void;
};

export default function EditWindow({
  title,
  fields,
  onSubmit,
  onClose,
}: EditWindowProps) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit(formData);
    onClose();
  }

  return (
    <>
      <BlurOverlay show={true} onClick={onClose} />

      <GenericWindow title={title} exitButton={true} onExit={onClose}>
        <div className="w-full">
          <FormContainer onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              {fields.map((field) => (
                <FormItem
                  key={field.name}
                  label={field.label}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  required={field.required}
                  items={field.items}
                  value={field.defaultValue}
                  className="mb-4"
                />
              ))}
            </div>

            <button
              type="submit"
              className="
                mt-2
                w-full
                py-3
                rounded-xl
                font-medium
                text-white
                btn-primary
                btn-hover
                transition
              "
            >
              Salvar
            </button>
          </FormContainer>
        </div>
      </GenericWindow>
    </>
  );
}
