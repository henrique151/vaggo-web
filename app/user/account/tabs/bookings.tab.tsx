import Tab from "@/classes/TabContainer/Tab";
import TabPage from "@/component/container/TabContainer/TabPage";

const Page = () => {
  // const { vehicles } = usePageContext();

  return (
    <TabPage label="Reservas">
      <h2 className="text-2xl font-semibold mb-6">Minhas Reservas</h2>

      <div className="space-y-4">
        <div className="border border-gray-200 rounded-2xl p-5 bg-white">
          <h3 className="font-semibold">Shopping Interlagos</h3>

          <p className="text-gray-500">20/04/2026 • 08:00 às 18:00</p>
        </div>

        <div className="border border-gray-200 rounded-2xl p-5 bg-white">
          <h3 className="font-semibold">Aeroporto Congonhas</h3>

          <p className="text-gray-500">25/04/2026 • 06:00 às 23:00</p>
        </div>
      </div>
    </TabPage>
  );
};

const BookingsTab = new Tab(
  { default: "Reservas", page: "Minhas Reservas" },
  Page,
);

export default BookingsTab;
