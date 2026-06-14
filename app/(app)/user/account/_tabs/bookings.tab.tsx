"use client";
import Tab from "@/classes/TabContainer/Tab";
import TabPage from "@/component/container/TabContainer/TabPage";
import EntityFrame from "@/component/container/EntityContainer/EntityFrame";
import DefaultEntityFrame from "@/component/frames/DefaultEntityFrame";
import useGetReservations from "@/modules/reservation/hooks/useGetReservations";
import { ReservationController } from "@controllers";
import { BrowserService } from "@services";

function formatDate(value: Date | string | undefined): string {
  if (!value) return "—";
  const d = value instanceof Date ? value : new Date(value as string);
  if (isNaN(d.getTime())) return String(value);
  return d.toLocaleDateString("pt-BR");
}

function statusLabel(status: string): string {
  const map: Record<string, string> = {
    PENDENTE: "Pendente",
    APROVADA: "Aprovada",
    RECUSADA: "Recusada",
    CANCELADA: "Cancelada",
  };
  return map[status] ?? status;
}

const Page = () => {
  const [reservations] = useGetReservations();

  const handleCancel = async (id: number) => {
    await ReservationController.changeApprovalStatus(
      BrowserService.getToken(),
      id,
      "cancel",
    );
    window.location.reload();
  };

  return (
    <TabPage label="Reservas">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Minhas Reservas</h2>
      </div>

      <div className="space-y-4">
        {!reservations ? (
          <p className="text-muted">Carregando reservas...</p>
        ) : reservations.length > 0 ? (
          reservations.map((reservation) => {
            const spot = reservation.info?.spot;
            const vehicle = reservation.info?.vehicle;
            const period = reservation.info?.date?.period;

            const spotName =
              spot?.info?.identifier ?? `Vaga #${spot?.id ?? "?"}`;
            const propertyName =
              (spot as any)?.property?.info?.name ?? "";
            const vehicleLabel = vehicle
              ? `${vehicle.brand ?? ""} ${vehicle.model ?? ""}`.trim()
              : "";
            const startDate = formatDate(period?.start);
            const endDate = formatDate(period?.end);
            const status = statusLabel(reservation.status);
            const canCancel =
              reservation.status === "PENDENTE" ||
              reservation.status === "APROVADA";

            return (
              <EntityFrame
                key={reservation.id}
                onCancelReservation={
                  canCancel
                    ? () => handleCancel(reservation.id)
                    : undefined
                }
              >
                <DefaultEntityFrame
                  title={spotName}
                  description={[propertyName, vehicleLabel ? `Veículo: ${vehicleLabel}` : ""]
                    .filter(Boolean)
                    .join(" · ")}
                  tagList={[
                    `Entrada: ${startDate}`,
                    `Saída: ${endDate}`,
                    `Status: ${status}`,
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

const BookingsTab = new Tab(
  { default: "Reservas", page: "Minhas Reservas" },
  Page,
);

export default BookingsTab;
