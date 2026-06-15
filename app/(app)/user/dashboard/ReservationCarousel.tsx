"use client";

import { useState } from "react";
import Link from "next/link";
import { Reservation } from "@classes";

// ── helpers ───────────────────────────────────────────────────────────────────

function fmt(d: Date | undefined) {
  if (!d) return "—";
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
}

const STATUS: Record<string, { label: string; color: string }> = {
  APROVADA:  { label: "Aprovada",  color: "text-emerald-500" },
  PENDENTE:  { label: "Pendente",  color: "text-amber-500"   },
  RECUSADA:  { label: "Recusada",  color: "text-rose-500"    },
  CANCELADA: { label: "Cancelada", color: "text-zinc-400"    },
};

// ── Card ─────────────────────────────────────────────────────────────────────

function ReservationCard({
  reservation,
  onReview,
}: {
  reservation: Reservation;
  onReview?: (id: number) => void;
}) {
  const spot       = reservation.info?.spot;
  const period     = reservation.info?.date?.period;
  const identifier = spot?.info?.identifier ?? `Vaga #${spot?.id ?? "?"}`;
  const property   = (spot as any)?.property;
  const redirectTo = property?.id ? `/spot/${property.id}` : undefined;
  const s          = STATUS[reservation.status] ?? STATUS.CANCELADA;

  return (
    <div className="w-48 shrink-0 bg-card border border-soft rounded-xl p-3 flex flex-col gap-2 hover:shadow-sm transition-shadow">

      {/* identificador + status */}
      <div className="flex items-center justify-between gap-1">
        {redirectTo ? (
          <Link href={redirectTo} className="text-sm font-semibold text-primary hover:text-sky-500 transition-colors truncate">
            {identifier}
          </Link>
        ) : (
          <span className="text-sm font-semibold text-primary truncate">{identifier}</span>
        )}
        <span className={`text-xs font-medium shrink-0 ${s.color}`}>{s.label}</span>
      </div>

      {/* propriedade */}
      {property?.info?.name && (
        <p className="text-xs text-subtle truncate">{property.info.name}</p>
      )}

      {/* datas */}
      <div className="flex items-center gap-1.5 text-xs text-muted">
        <span>{fmt(period?.start)}</span>
        {period?.end && <><span className="text-subtle">→</span><span>{fmt(period.end)}</span></>}
      </div>

      {/* avaliar */}
      {onReview && reservation.status === "APROVADA" && (
        <button
          onClick={() => onReview(reservation.id)}
          className="text-xs text-sky-500 hover:underline text-left mt-auto"
        >
          Avaliar
        </button>
      )}
    </div>
  );
}

// ── Carrossel ─────────────────────────────────────────────────────────────────

const CARD_W  = 192; // w-48 = 12rem = 192px
const GAP     = 12;
const STEP    = CARD_W + GAP;
const VISIBLE = 3;

interface Props {
  reservations: Reservation[];
  onReview?: (id: number) => void;
}

export default function ReservationCarousel({ reservations, onReview }: Props) {
  const [index, setIndex] = useState(0);
  const maxIndex = Math.max(0, reservations.length - VISIBLE);

  if (reservations.length === 0) return null;

  return (
    <div className="w-full">
      {reservations.length > VISIBLE && (
        <div className="flex justify-end gap-1.5 mb-3">
          <button
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            disabled={index === 0}
            className="app-icon-button w-7 h-7 text-base disabled:opacity-30"
          >
            ‹
          </button>
          <button
            onClick={() => setIndex((i) => Math.min(maxIndex, i + 1))}
            disabled={index === maxIndex}
            className="app-icon-button w-7 h-7 text-base disabled:opacity-30"
          >
            ›
          </button>
        </div>
      )}

      <div className="overflow-hidden">
        <div
          className="flex gap-3 transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${index * STEP}px)` }}
        >
          {reservations.map((r) => (
            <ReservationCard key={r.id} reservation={r} onReview={onReview} />
          ))}
        </div>
      </div>
    </div>
  );
}
