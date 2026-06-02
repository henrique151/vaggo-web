import Tab from "@/classes/TabContainer/Tab";
import TabPage from "@/component/container/TabContainer/TabPage";

const Page = () => {
  // const { vehicles } = usePageContext();

  return (
    <TabPage label="Reservas">
      <h2 className="text-2xl font-semibold mb-6">Minhas Reservas</h2>

      <div className="space-y-4">
        {/*<div className="border border-soft rounded-2xl p-5 bg-base">
          <h3 className="font-semibold text-base">Shopping Interlagos</h3>

          <p className="text-muted">20/04/2026 • 08:00 às 18:00</p>
        </div>

        <div className="border border-soft rounded-2xl p-5 bg-base">
          <h3 className="font-semibold text-base">Aeroporto Congonhas</h3>

          <p className="text-muted">25/04/2026 • 06:00 às 23:00</p>
        </div>*/}
      </div>
    </TabPage>
  );
};

const BookingsTab = new Tab(
  { default: "Reservas", page: "Minhas Reservas" },
  Page,
);

export default BookingsTab;
