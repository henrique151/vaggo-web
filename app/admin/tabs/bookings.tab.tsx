import Tab from "@/classes/TabContainer/Tab";
import TabPage from "@/component/container/TabContainer/TabPage";
import EntityFrame from "@/component/container/EntityContainer/EntityFrame";
import DefaultEntityFrame from "@/component/frames/DefaultEntityFrame";
import { usePageContext } from "../_context/page.context";
import { Reservation } from "@classes";
import { APIService, BrowserService } from "@services";

// TODO: substituir pelo tipo real de Booking e pelo hook de dados
type AdminBooking = {
  id: number;
  spotName: string;
  propertyName: string;
  renterName: string;
  startDate: string;
  endDate: string;
  status: "ATIVA" | "CONCLUIDA" | "CANCELADA";
};

const statusLabel = {
  APROVADA: "Ativa",
  CONCLUIDA: "Concluída",
  CANCELADA: "Cancelada",
  RECUSADA: "Recusada",
} as const;

const Page = () => {
  const { reservations, refreshReservations } = usePageContext();
  console.log(reservations);
  // const bookings: AdminBooking[] = []; // placeholder

  return (
    <TabPage label="Reservas">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Reservas</h2>
      </div>

      <div className="space-y-4">
        {reservations.length > 0 ? (
          reservations.map((reservation: Reservation) => (
            <EntityFrame
              key={reservation.id}
              // editTitle={`Editar Reserva #${reservation.id.toString().padStart(2, "0")}`}
              // editFields={[
              //   {
              //     label: "Data de início",
              //     name: "startDate",
              //     type: "date",
              //     defaultValue: reservation.info.date.period.start.toString(),
              //     required: true,
              //   },
              //   {
              //     label: "Data de término",
              //     name: "endDate",
              //     type: "date",
              //     defaultValue: reservation.info.date.period.start.toString(),
              //     required: true,
              //   },
              //   {
              //     label: "Status",
              //     name: "status",
              //     type: "select",
              //     defaultValue: reservation.status,
              //     items: [
              //       { value: "ATIVA", label: "Ativa" },
              //       { value: "CONCLUIDA", label: "Concluída" },
              //       { value: "CANCELADA", label: "Cancelada" },
              //     ],
              //   },
              // ]}
              // onEdit={(formData) => {
              //   // TODO: wire to update booking action
              //   console.log(
              //     "edit booking",
              //     reservation.id,
              //     Object.fromEntries(formData),
              //   );
              // }}
              deleteTitle="Cancelar reserva"
              deleteDescription={`Deseja Cancelar a reserva #${reservation.id.toString().padStart(2, "0")} forçadamente do usuário?`}
              onDelete={async () => {
                // TODO: wire to delete booking action
                const res = await APIService.genericPatchRequest(
                  BrowserService.getToken(),
                  `admin/reservations/${reservation.id}/force-cancel`,
                  -1,
                );

                if (res) {
                  refreshReservations();
                }
                console.log("delete booking", reservation.id);
              }}
            >
              <DefaultEntityFrame
                title={`Reserva #${reservation.id.toString().padStart(2, "0")}`}
                description={`${reservation?.info?.spot?.info?.identifier} — ${reservation?.info?.spot?.property?.info?.name}`}
                tagList={[
                  // `Locatário: ${reservation?.info?.user?.person?.name}`,
                  `Início: ${reservation.info?.date?.period?.start}`,
                  `Término: ${reservation.info?.date?.period?.end}`,
                  `Status: ${statusLabel[reservation.status]}`,
                ]}
              />
            </EntityFrame>
          ))
        ) : (
          <p className="text-muted">Nenhuma reserva encontrada.</p>
        )}
      </div>
    </TabPage>
  );
};

const BookingsTab = new Tab({ default: "Reservas", page: "Reservas" }, Page);

export default BookingsTab;
