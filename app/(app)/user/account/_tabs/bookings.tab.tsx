import Tab from "@/classes/TabContainer/Tab";
import TabPage from "@/component/container/TabContainer/TabPage";
import EntityFrame from "@/component/container/EntityContainer/EntityFrame";
import DefaultEntityFrame from "@/component/frames/DefaultEntityFrame";
// TODO: replace with real Booking type from context when available
type Booking = {
  id: number;
  spotName: string;
  property: string;
  startDate: string;
  endDate: string;
  status: string;
};

const Page = () => {
  // const { bookings } = usePageContext(); // TODO: uncomment when bookings are added to context
  const bookings: Booking[] = []; // placeholder

  return (
    <TabPage label="Reservas">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Minhas Reservas</h2>
      </div>

      <div className="space-y-4">
        {bookings.length > 0
          ? bookings.map((booking) => (
              <EntityFrame
                key={booking.id}
                editTitle={`Editar Reserva #${booking.id.toString().padStart(2, "0")}`}
                editFields={[
                  { label: "Data de início", name: "startDate", type: "date", defaultValue: booking.startDate, required: true },
                  { label: "Data de término", name: "endDate", type: "date", defaultValue: booking.endDate, required: true },
                ]}
                onEdit={(formData) => {
                  // TODO: wire to update booking action
                  console.log("edit booking", booking.id, Object.fromEntries(formData));
                }}
                onCancelReservation={() => {}}
                deleteTitle="Cancelar reserva"
                deleteDescription={`Deseja cancelar a reserva de "${booking.spotName}" em ${booking.property}?`}
                onDelete={() => {
                  // TODO: wire to cancel/delete booking action
                  console.log("delete booking", booking.id);
                }}
              >
                <DefaultEntityFrame
                  title={booking.spotName}
                  description={booking.property}
                  tagList={[
                    `Início: ${booking.startDate}`,
                    `Término: ${booking.endDate}`,
                    `Status: ${booking.status}`,
                  ]}
                />
              </EntityFrame>
            ))
          : <p className="text-muted">Nenhuma reserva registrada no momento.</p>}
      </div>
    </TabPage>
  );
};

const BookingsTab = new Tab(
  { default: "Reservas", page: "Minhas Reservas" },
  Page,
);

export default BookingsTab;
