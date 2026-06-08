import Tab from "@/classes/TabContainer/Tab";
import TabPage from "@/component/container/TabContainer/TabPage";
import { usePageContext } from "../page.context";
import { EntityCard } from "@/component/container/EntityContainer/EntityCard";
import Link from "next/link";
import EntityFrame from "@/component/container/EntityContainer/EntityFrame";
import DefaultEntityFrame from "@/component/frames/DefaultEntityFrame";

const Page = () => {
  const { vehicles } = usePageContext();

  return (
    <TabPage label="Veículos">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Meus Veículos</h2>

        <Link
          href="/user/vehicle/register"
          className="
            px-4 py-2
            rounded-xl
            text-sm
            font-medium
            btn-primary
            btn-hover
            text-white
            transition
            shrink-0
          "
        >
          + Novo veículo
        </Link>
      </div>

      <div className="space-y-4">
        {vehicles?.map((vehicle) => {
          return (
            <EntityFrame key={vehicle.id}>
              <DefaultEntityFrame
                key={vehicle.id}
                title={`${vehicle.type.toLowerCase().replace(vehicle.type.toLowerCase()[0], vehicle.type[0])} ${vehicle.brand}`}
                description={`Modelo: ${vehicle.model}`}
                tagList={[
                  `Placa: ${vehicle.licensePlate}`,
                  `Fabricação: ${vehicle.manufactureYear}`,
                  `Tamanho: ${{ PEQUENO: "Pequeno", MEDIO: "Médio", GRANDE: "Grande" }[vehicle.size]}`,
                  `Cor: ${vehicle.color}`,
                ]}
              />
            </EntityFrame>
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
