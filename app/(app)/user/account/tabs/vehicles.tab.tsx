import Tab from "@/classes/TabContainer/Tab";
import TabPage from "@/component/container/TabContainer/TabPage";
import { usePageContext } from "../page.context";
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
          const label = vehicle.type
            .toLowerCase()
            .replace(vehicle.type.toLowerCase()[0], vehicle.type[0]);

          return (
            <EntityFrame
              key={vehicle.id}
              editTitle={`Editar ${label} ${vehicle.brand}`}
              editFields={[
                { label: "Marca", name: "brand", type: "text", placeholder: "Ex: Toyota", defaultValue: vehicle.brand, required: true },
                { label: "Modelo", name: "model", type: "text", placeholder: "Ex: Corolla", defaultValue: vehicle.model, required: true },
                { label: "Placa", name: "licensePlate", type: "text", placeholder: "ABC-1234", defaultValue: vehicle.licensePlate, required: true },
                { label: "Ano de Fabricação", name: "manufactureYear", type: "number", placeholder: "2000", defaultValue: String(vehicle.manufactureYear), required: true },
                { label: "Cor", name: "color", type: "text", placeholder: "Ex: Prata", defaultValue: vehicle.color },
                {
                  label: "Tipo do Veículo", name: "type", type: "select",
                  defaultValue: vehicle.type,
                  items: [
                    { value: "CARRO", label: "Carro" },
                    { value: "MOTO", label: "Moto" },
                  ],
                },
                {
                  label: "Porte", name: "size", type: "select",
                  defaultValue: vehicle.size,
                  items: [
                    { value: "PEQUENO", label: "Pequeno" },
                    { value: "MEDIO", label: "Médio" },
                    { value: "GRANDE", label: "Grande" },
                  ],
                },
              ]}
              onEdit={(formData) => {
                // TODO: wire to update vehicle action
                console.log("edit vehicle", vehicle.id, Object.fromEntries(formData));
              }}
              deleteTitle="Excluir veículo"
              deleteDescription={`Deseja excluir o veículo ${label} ${vehicle.brand} (${vehicle.licensePlate})?`}
              onDelete={() => {
                // TODO: wire to delete vehicle action
                console.log("delete vehicle", vehicle.id);
              }}
            >
              <DefaultEntityFrame
                title={`${label} ${vehicle.brand}`}
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
