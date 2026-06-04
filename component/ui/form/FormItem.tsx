import { HTMLInputTypeAttribute } from "react";

const formTypes: Partial<Record<HTMLInputTypeAttribute, React.ReactNode>> = {};

type HTMLInputExtraParameters = "select";

export default function FormItem({
  label,
  type,
  name,
  required,
  placeholder,
  items,
  value,
  className,
  multiple,
}: {
  type?: HTMLInputTypeAttribute | HTMLInputExtraParameters;
  // type: string;
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  items?: { value: string; label: string }[];
  value?: string;
  className?: string;
  multiple?: boolean;
}) {
  const baseStyle: string = `
    px-4 py-3
    rounded-lg
    border-base
    app-input
    focus:outline-none
    focus:ring-2 focus:ring-gray-300
    `;

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
      defaultValue={value}
      multiple={multiple}
    />
  );

  return (
    <div className={`flex flex-col gap-1 ${className || ""}`}>
      <label className="text-sm text-gray-600">{label}</label>

      {type in formItemTable ? formItemTable[type] : GenericFormInput}
    </div>
  );
}

// switch case to attributes
