import ControllerStatus from "@/classes/controller/ControllerStatus";
import { HTMLInputTypeAttribute, useEffect } from "react";

const formTypes: Partial<Record<HTMLInputTypeAttribute, React.ReactNode>> = {};

type HTMLInputExtraParameters = "select";

type FormItemProps = {
  label: string;
  name: string;
  type?: HTMLInputTypeAttribute | HTMLInputExtraParameters;
  required?: boolean;
  placeholder?: string;
  items?: { value: string; label: string }[];
  value?: string;
  className?: string;
  multiple?: boolean;
  error?: boolean;
  errorMessage?: string;
  controller?: ControllerStatus;
};

export default function FormItem({
  label,
  name,
  type,
  required,
  placeholder,
  items,
  value,
  className,
  multiple,
  error,
  errorMessage,
  controller,
}: FormItemProps) {
  const formError = controller?.fields[name]?.error ?? error ?? false;
  const formErrorMessage =
    controller?.fields[name]?.error?.message ?? errorMessage ?? undefined;
  const formValue = controller?.fields[name]?.value ?? value ?? undefined;
  const baseStyle: string = `
    px-4 py-3
    rounded-lg
    border-base
    ${formError ? "app-input-error" : "app-input"}

    `;

  // useEffect(() => {
  //   if (controller) console.log("error changed!", controller);
  //   console.log("hsodksodk");
  // }, [controller]);

  const formItemTable = {
    select: (
      <select className={baseStyle} name={name}>
        {items?.map((item) => {
          return (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          );
        })}
      </select>
    ),
  };

  const GenericFormInput = (
    <input
      type={type}
      name={name}
      required={required}
      placeholder={placeholder}
      className={baseStyle}
      defaultValue={formValue}
      multiple={multiple}
    />
  );

  return (
    <div className={`flex flex-col gap-1 ${className || ""}`}>
      <label
        className={`text-sm ${formError ? "text-rose-600" : "text-gray-600"}`}
      >
        {label}
      </label>

      {type in formItemTable ? formItemTable[type] : GenericFormInput}
      <p className="text-xs text-rose-500">{formErrorMessage}</p>
    </div>
  );
}

// switch case to attributes
