"use client";
import { useState } from "react";
import Tab from "@/classes/TabContainer/Tab";
import TabPage from "@/component/container/TabContainer/TabPage";
import EntityFrame from "@/component/container/EntityContainer/EntityFrame";
import DefaultEntityFrame from "@/component/frames/DefaultEntityFrame";
import useGetReservations from "@/modules/reservation/hooks/useGetReservations";
import { ReservationController } from "@controllers";
import { BrowserService } from "@services";
import FilterBar, { FilterField, FilterValues } from "@/component/filter/FilterBar";

function formatDate(value: Date | string | undefined): string {
  if (!value) return "—";
  const d = value instanceof Date ? value : new Date(value as string);
  if (isNaN(d.getTime())) return String(value);
  return d.toLocaleDateString("pt-BR");
}

function statusLabel(status: string): string {
  const map: Record<string, string> = {
    PENDENTE: "Pendente", APROVADA: "Aprovada", RECUSADA: "Recusada", CANCELADA: "Cancelada",
  };
  return map[status] ?? status;
}

const FILTER_FIELDS: FilterField[] = [
  { key: "spotName", label: "Vaga", type: "text", placeholder: "Nome ou ID da vaga" },
  { key: "startDate", label: "Data de início", type: "date" },
  {
    key: "status", label: "Status", type: "select",
    options: [
      { value: "PENDENTE",  label: "Pendente" },
      { value: "APROVADA",  label: "Aprovada" },
      { value: "RECUSADA",  label: "Recusada" },
      { value: "CANCELADA", label: "Cancelada" },
    ],
  },
];

const Page = () => {
  const [reservations] = useGetReservations();
  const [displayReservations, setDisplayReservations] = useState<typeof reservations | undefined>(undefined);

  const filtered = displayReservations ?? reservations;

  function handleSearch(values: FilterValues) {
    if (!reservations) return;
    const { spotName, startDate, status } = values;
    const hasFilter = spotName || startDate || status;
    if (!hasFilter) { setDisplayReservations(undefined); return; }

    setDisplayReservations(
      reservations.filter((r) => {
        const spot = r.info?.spot;
        const sName = spot?.info?.identifier ?? `Vaga #${spot?.id ?? ""}`;
        if (spotName  && !sName.toLowerCase().includes(spotName.toLowerCase())) return false;
        if (status    && r.status !== status)                                     return false;
        if (startDate) {
          const start = r.info?.date?.period?.start;
          if (!start || new Date(start).toISOString().substring(0, 10) !== startDate) return false;
        }
        return true;
      }),
    );
  }

  const handleCancel = async (id: number) => {
    await ReservationController.changeApprovalStatus(BrowserService.getToken(), id, "cancel");
    window.location.reload();
  };

  return (
    <TabPage label="Reservas">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Minhas Reservas</h2>
      </div>

      <FilterBar
        title="Filtrar Reservas"
        fields={FILTER_FIELDS}
        onSearch={handleSearch}
        onClear={() => setDisplayReservations(undefined)}
      />

      <div className="space-y-4">
        {!filtered ? (
          <p className="text-muted">Carregando reservas...</p>
        ) : filtered.length > 0 ? (
          filtered.map((reservation) => {
            const spot        = reservation.info?.spot;
            const vehicle     = reservation.info?.vehicle;
            const period      = reservation.info?.date?.period;
            const spotName    = spot?.info?.identifier ?? `Vaga #${spot?.id ?? "?"}`;
            const propertyName= (spot as any)?.property?.info?.name ?? "";
            const vehicleLabel= vehicle ? `${vehicle.brand ?? ""} ${vehicle.model ?? ""}`.trim() : "";
            const canCancel   = reservation.status === "PENDENTE" || reservation.status === "APROVADA";

            return (
              <EntityFrame
                key={reservation.id}
                onCancelReservation={canCancel ? () => handleCancel(reservation.id) : undefined}
              >
                <DefaultEntityFrame
                  title={spotName}
                  description={[propertyName, vehicleLabel ? `Veículo: ${vehicleLabel}` : ""].filter(Boolean).join(" · ")}
                  tagList={[
                    `Entrada: ${formatDate(period?.start)}`,
                    `Saída: ${formatDate(period?.end)}`,
                    `Status: ${statusLabel(reservation.status)}`,
                  ]}
                />
              </EntityFrame>
            );
          })
        ) : (
          <p className="text-muted">Nenhuma reserva registrada no momento.</p>
        )}
      </div>
    </TabPage>
  );
};

const BookingsTab = new Tab({ default: "Reservas", page: "Minhas Reservas" }, Page);
export default BookingsTab;
