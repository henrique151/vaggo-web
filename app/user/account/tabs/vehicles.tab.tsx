import Tab from "@/classes/TabContainer/Tab";
import TabPage from "@/component/container/TabContainer/TabPage";
import { usePageContext } from "../page.context";
import { EntityCard } from "@/component/container/EntityContainer/EntityCard";
import Link from "next/link";

const Page = () => {
  const { vehicles } = usePageContext();

  return (
    <TabPage label="Veículos">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Meus Veículos</h2>

        <Link
          href="/user/vehicle/register"
          className="px-4 py-2 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-black transition"
        >
          + Novo veículo
        </Link>
      </div>

      <div className="space-y-4">
        {vehicles?.map((vehicle) => {
          return (
            <EntityCard
              key={vehicle.id}
              title={`${vehicle.brand} - ${vehicle.model}`}
              description={""}
            />
          );
        }) || "Vazio"}
      </div>
    </TabPage>
  );
};

const VehiclesTab = new Tab(
  { default: "Veículos", page: "Meus Veículos" },
  Page,
);

export default VehiclesTab;
