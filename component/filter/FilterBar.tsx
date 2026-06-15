"use client";

import { useState } from "react";

// ──────────────────────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────────────────────

type SelectOption = { value: string; label: string };

type FilterFieldBase = {
  /** chave usada em FilterValues */
  key: string;
  label: string;
  placeholder?: string;
};

export type FilterTextField = FilterFieldBase & {
  type: "text" | "email" | "number" | "date";
};

export type FilterSelectField = FilterFieldBase & {
  type: "select";
  options: SelectOption[];
  /** opção que representa "todos" — padrão: { value: "", label: "Todos" } */
  allOption?: SelectOption;
};

export type FilterField = FilterTextField | FilterSelectField;

export type FilterValues = Record<string, string>;

interface FilterBarProps {
  /** Título opcional exibido acima dos campos */
  title?: string;
  fields: FilterField[];
  onSearch: (values: FilterValues) => void | Promise<void>;
  onClear?: (values: FilterValues) => void;
  /** Texto do botão de busca — padrão "Buscar" */
  searchLabel?: string;
  /** Texto do botão de limpar — padrão "Limpar" */
  clearLabel?: string;
}

// ──────────────────────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────────────────────

function buildEmpty(fields: FilterField[]): FilterValues {
  return Object.fromEntries(fields.map((f) => [f.key, ""]));
}

// ──────────────────────────────────────────────────────────────
// Component
// ──────────────────────────────────────────────────────────────

export default function FilterBar({
  title = "Filtrar",
  fields,
  onSearch,
  onClear,
  searchLabel = "Buscar",
  clearLabel = "Limpar",
}: FilterBarProps) {
  const [values, setValues] = useState<FilterValues>(buildEmpty(fields));
  const [loading, setLoading] = useState(false);

  function set(key: string, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSearch() {
    setLoading(true);
    try {
      await onSearch(values);
    } finally {
      setLoading(false);
    }
  }

  function handleClear() {
    const empty = buildEmpty(fields);
    setValues(empty);
    onClear?.(empty);
  }

  return (
    <div className="surface-elevated rounded-2xl p-4 mb-6">
      {title && (
        <p className="text-xs font-medium text-muted mb-3 uppercase tracking-wide">
          {title}
        </p>
      )}

      <div className="flex flex-wrap gap-3 items-end">
        {fields.map((field) => (
          <div key={field.key} className="flex flex-col gap-1 min-w-[140px]">
            <label className="text-xs text-muted">{field.label}</label>

            {field.type === "select" ? (
              <select
                className="app-input text-sm py-2"
                value={values[field.key]}
                onChange={(e) => set(field.key, e.target.value)}
              >
                <option value={field.allOption?.value ?? ""}>
                  {field.allOption?.label ?? "Todos"}
                </option>
                {field.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                className="app-input text-sm py-2"
                placeholder={field.placeholder}
                value={values[field.key]}
                onChange={(e) => set(field.key, e.target.value)}
              />
            )}
          </div>
        ))}

        {/* Botões */}
        <div className="flex gap-2 pb-[1px]">
          <button
            onClick={handleSearch}
            disabled={loading}
            className="btn-primary px-4 py-2 rounded-xl text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Buscando…" : searchLabel}
          </button>
          <button
            onClick={handleClear}
            className="px-4 py-2 rounded-xl text-sm font-medium bg-card border border-soft text-muted hover:bg-zinc-100 dark:hover:bg-zinc-700 transition"
          >
            {clearLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
