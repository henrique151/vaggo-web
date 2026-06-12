import Tab from "@/classes/TabContainer/Tab";
import TabPage from "@/component/container/TabContainer/TabPage";
import EntityFrame from "@/component/container/EntityContainer/EntityFrame";
import DefaultEntityFrame from "@/component/frames/DefaultEntityFrame";

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
  ATIVA: "Ativa",
  CONCLUIDA: "Concluída",
  CANCELADA: "Cancelada",
} as const;

const Page = () => {
  // TODO: const { bookings } = useAdminContext();
  const bookings: AdminBooking[] = []; // placeholder

  return (
    <TabPage label="Reservas">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Reservas</h2>
      </div>

      <div className="space-y-4">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <EntityFrame
              key={booking.id}
              editTitle={`Editar Reserva #${booking.id.toString().padStart(2, "0")}`}
              editFields={[
                { label: "Data de início", name: "startDate", type: "date", defaultValue: booking.startDate, required: true },
                { label: "Data de término", name: "endDate", type: "date", defaultValue: booking.endDate, required: true },
                {
                  label: "Status", name: "status", type: "select",
                  defaultValue: booking.status,
                  items: [
                    { value: "ATIVA", label: "Ativa" },
                    { value: "CONCLUIDA", label: "Concluída" },
                    { value: "CANCELADA", label: "Cancelada" },
                  ],
                },
              ]}
              onEdit={(formData) => {
                // TODO: wire to update booking action
                console.log("edit booking", booking.id, Object.fromEntries(formData));
              }}
              deleteTitle="Excluir reserva"
              deleteDescription={`Deseja excluir a reserva #${booking.id.toString().padStart(2, "0")} de ${booking.renterName}?`}
              onDelete={() => {
                // TODO: wire to delete booking action
                console.log("delete booking", booking.id);
              }}
            >
              <DefaultEntityFrame
                title={`Reserva #${booking.id.toString().padStart(2, "0")}`}
                description={`${booking.spotName} — ${booking.propertyName}`}
                tagList={[
                  `Locatário: ${booking.renterName}`,
                  `Início: ${booking.startDate}`,
                  `Término: ${booking.endDate}`,
                  `Status: ${statusLabel[booking.status]}`,
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
