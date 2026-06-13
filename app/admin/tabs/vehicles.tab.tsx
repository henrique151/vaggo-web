import Tab from "@/classes/TabContainer/Tab";
import TabPage from "@/component/container/TabContainer/TabPage";
import EntityFrame from "@/component/container/EntityContainer/EntityFrame";
import DefaultEntityFrame from "@/component/frames/DefaultEntityFrame";
import { usePageContext } from "../_context/page.context";
import { Vehicle } from "@classes";
import { APIService, BrowserService } from "@services";

// TODO: substituir pelo tipo real de Vehicle e pelo hook de dados
// type AdminVehicle = {
//   id: number;
//   brand: string;
//   model: string;
//   licensePlate: string;
//   manufactureYear: number;
//   color?: string;
//   type: "CARRO" | "MOTO";
//   size: "PEQUENO" | "MEDIO" | "GRANDE";
//   ownerName: string;
// };

const typeLabel = { CARRO: "Carro", MOTO: "Moto" } as const;
const sizeLabel = {
  PEQUENO: "Pequeno",
  MEDIO: "Médio",
  GRANDE: "Grande",
} as const;

const Page = () => {
  const { vehicles, refreshVehicles } = usePageContext();
  console.log(vehicles);

  return (
    <TabPage label="Veículos">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Veículos</h2>
      </div>

      <div className="space-y-4">
        {vehicles?.length > 0 ? (
          vehicles.map((vehicle?: Vehicle) => (
            <EntityFrame
              key={vehicle?.id}
              editTitle={`Editar ${typeLabel[vehicle?.type]} ${vehicle?.brand}`}
              editFields={[
                {
                  label: "Marca",
                  name: "brand",
                  type: "text",
                  placeholder: "Ex: Toyota",
                  defaultValue: vehicle?.brand,
                  required: true,
                },
                {
                  label: "Modelo",
                  name: "model",
                  type: "text",
                  placeholder: "Ex: Corolla",
                  defaultValue: vehicle?.model,
                  required: true,
                },
                {
                  label: "Placa",
                  name: "licensePlate",
                  type: "text",
                  placeholder: "ABC-1234",
                  defaultValue: vehicle?.licensePlate,
                  required: true,
                },
                {
                  label: "Ano de Fabricação",
                  name: "manufactureYear",
                  type: "number",
                  placeholder: "2000",
                  defaultValue: String(vehicle.manufactureYear.getFullYear()),
                  required: true,
                },
                {
                  label: "Cor",
                  name: "color",
                  type: "text",
                  placeholder: "Ex: Prata",
                  defaultValue: vehicle?.color,
                },
                {
                  label: "Tipo",
                  name: "type",
                  type: "select",
                  defaultValue: vehicle?.type,
                  items: [
                    { value: "CARRO", label: "Carro" },
                    { value: "MOTO", label: "Moto" },
                  ],
                },
                {
                  label: "Porte",
                  name: "size",
                  type: "select",
                  defaultValue: vehicle?.size,
                  items: [
                    { value: "PEQUENO", label: "Pequeno" },
                    { value: "MEDIO", label: "Médio" },
                    { value: "GRANDE", label: "Grande" },
                  ],
                },
              ]}
              onEdit={async (formData) => {
                // TODO: wire to update vehicle action
                const res = await APIService.genericEditRequest(
                  BrowserService.getToken(),
                  "admin/vehicles",
                  vehicle.id,
                  formData,
                  "json",
                );

                if (res) {
                  refreshVehicles();
                }
                console.log(
                  "edit vehicle",
                  vehicle?.id,
                  Object.fromEntries(formData),
                );
              }}
              deleteTitle="Excluir veículo"
              deleteDescription={`Deseja excluir o veículo ${typeLabel[vehicle?.type]} ${vehicle?.brand} (${vehicle?.licensePlate})?`}
              onDelete={async () => {
                const res = await APIService.genericDeleteRequest(
                  BrowserService.getToken(),
                  "admin/vehicles",
                  vehicle.id,
                );

                if (res) {
                  refreshVehicles();
                }
                // TODO: wire to delete vehicle action
                console.log("delete vehicle", vehicle?.id);
              }}
            >
              <DefaultEntityFrame
                title={`${typeLabel[vehicle?.type]} ${vehicle?.brand} ${vehicle?.model}`}
                description={`Dono: ${vehicle?.user?.person?.name}`}
                tagList={[
                  `Placa: ${vehicle?.licensePlate}`,
                  `Fabricação: ${vehicle?.manufactureYear}`,
                  `Porte: ${sizeLabel[vehicle?.size]}`,
                  ...(vehicle?.color ? [`Cor: ${vehicle?.color}`] : []),
                ]}
              />
            </EntityFrame>
          ))
        ) : (
          <p className="text-muted">Nenhum veículo encontrado.</p>
        )}
      </div>
    </TabPage>
  );
};

const VehiclesTab = new Tab({ default: "Veículos", page: "Veículos" }, Page);

export default VehiclesTab;
