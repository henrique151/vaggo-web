import { HTMLInputTypeAttribute } from "react";

const formTypes: Partial<Record<HTMLInputTypeAttribute, React.ReactNode>> = {};

export default function FormItem({
  label,
  type,
  name,
  required,
  placeholder,
  items,
}: {
  type?: HTMLInputTypeAttribute;
  // type: string;
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  items?: string[];
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-600">{label}</label>

      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="
        px-4 py-3
        rounded-lg
        border border-gray-300
        bg-white/90
        focus:outline-none
        focus:ring-2 focus:ring-gray-300
      "
      />
    </div>
  );
}

// switch case to attributes
