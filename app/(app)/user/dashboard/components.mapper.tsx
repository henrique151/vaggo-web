"use client";

import { useState } from "react";
import { Reservation } from "@classes";
import { ReservationController } from "@controllers";
import { BrowserService } from "@services";

// ── helper ────────────────────────────────────────────────────────────────────

function fmt(d: Date | undefined) {
  if (!d) return "—";
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
}

// ── SolicitationCard ──────────────────────────────────────────────────────────

const handleSolicitation = async (
  id: number,
  mode: "approve" | "reject" | "cancel",
) => {
  const res = await ReservationController.changeApprovalStatus(
    BrowserService.getToken(),
    id,
    mode,
  );

  if (res) {
    console.log(
      `This solicitation has been ${mode}. The following data is from api (which actually is only a boolean at the moment)`,
    );
    console.log(res);
    return true;
  }
  return false;
};

function SolicitationCard({ reservation }: { reservation: Reservation }) {
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState<"approve" | "reject" | null>(null);

  if (!visible) return null;

  const spot    = reservation.info?.spot;
  const user    = reservation.info?.user;
  const vehicle = reservation.info?.vehicle;
  const period  = reservation.info?.date?.period;
  const identifier   = spot?.info?.identifier ?? `Vaga #${spot?.id ?? "?"}`;
  const propertyName = (spot as any)?.property?.info?.name ?? "";
  const solicitante  = user?.person?.name || "Desconhecido";
  const vehicleLabel = vehicle ? `${vehicle.brand ?? ""} ${vehicle.model ?? ""}`.trim() : null;
  async function handleConfirm() {
    setLoading("approve");
    const res = await handleSolicitation(reservation.id, "approve");
    if (res) setVisible(false);
    else setLoading(null);
  }

  async function handleReject() {
    setLoading("reject");
    const res = await handleSolicitation(reservation.id, "reject");
    if (res) setVisible(false);
    else setLoading(null);
  }

  return (
    <div
      id={`booking_solicitation_${reservation.id}`}
      className="flex items-stretch gap-0 bg-card border border-soft rounded-xl overflow-hidden hover:shadow-sm transition-shadow"
    >
      {/* barra lateral âmbar — pendente */}
      <div className="w-1 shrink-0 bg-amber-400" />

      <div className="flex flex-1 items-center justify-between gap-4 px-4 py-3 flex-wrap">

        {/* info */}
        <div className="flex flex-col gap-0.5 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-primary truncate">{identifier}</span>
            {propertyName && (
              <span className="text-xs text-subtle truncate hidden sm:inline">{propertyName}</span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted">
           {/* <span>👤 {solicitante}</span> */}
            {vehicleLabel && <span>🚗 {vehicleLabel}</span>}
            <span>📅 {fmt(period?.start)}{period?.end ? ` → ${fmt(period.end)}` : ""}</span>
            <span className="text-subtle">#{reservation.code}</span>
          </div>
        </div>

        {/* botões */}
        <div className="flex gap-2 shrink-0">
          <button
            onClick={handleConfirm}
            disabled={!!loading}
            className="px-4 py-1.5 rounded-lg text-xs font-medium text-white btn-primary transition disabled:opacity-50"
          >
            {loading === "approve" ? "…" : "Aceitar"}
          </button>
          <button
            onClick={handleReject}
            disabled={!!loading}
            className="px-4 py-1.5 rounded-lg text-xs font-medium text-white bg-rose-500 hover:bg-rose-600 transition disabled:opacity-50"
          >
            {loading === "reject" ? "…" : "Recusar"}
          </button>
        </div>

      </div>
    </div>
  );
}

export function mapSolicitationFrames(d: Reservation) {
  return <SolicitationCard key={d.id} reservation={d} />;
}
