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
  type?: HTMLInputTypeAttribute | "select";
  // type: string;
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  items?: { value: string; label: string }[];
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-600">{label}</label>

      {type == "select" ? (
        <select name={name}>
          {items?.map((item) => {
            return (
              <option key={item.value} value={item.value} selected>
                {item.label}
              </option>
            );
          })}
          {/*<option value={1}>asodkosakdoskad</option>*/}
        </select>
      ) : (
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
      )}
    </div>
  );
}

// switch case to attributes
