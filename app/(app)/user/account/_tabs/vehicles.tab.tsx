"use client";
import { useState, startTransition, useEffect } from "react";
import Tab from "@/classes/TabContainer/Tab";
import TabPage from "@/component/container/TabContainer/TabPage";
import { usePageContext } from "../page.context";
import Link from "next/link";
import EntityFrame from "@/component/container/EntityContainer/EntityFrame";
import DefaultEntityFrame from "@/component/frames/DefaultEntityFrame";
import useForm from "@/hooks/useForm";
import { FormUtils } from "@utils";
import { Vehicle } from "@classes";
import deleteVehicle from "../_actions/vehicle/delete.action";
import action from "../_actions/vehicle/edit.action";
import { ControllerStatusStructureInterface } from "@interfaces";
import FilterBar, { FilterField, FilterValues } from "@/component/filter/FilterBar";

const sizeMap = { PEQUENO: "Pequeno", MEDIO: "Médio", GRANDE: "Grande" } as const;

const FILTER_FIELDS: FilterField[] = [
  { key: "brand",        label: "Marca",  type: "text", placeholder: "Ex: Toyota" },
  { key: "licensePlate", label: "Placa",  type: "text", placeholder: "ABC-1234" },
  { key: "type", label: "Tipo", type: "select",
    options: [{ value: "CARRO", label: "Carro" }, { value: "MOTO", label: "Moto" }] },
];

const Page = () => {
  const { vehicles } = usePageContext();
  const [displayVehicles, setDisplayVehicles] = useState<Vehicle[] | undefined>(undefined);

  const filtered = displayVehicles ?? vehicles ?? [];

  function handleSearch(values: FilterValues) {
    if (!vehicles) return;
    const { brand, licensePlate, type } = values;
    const hasFilter = brand || licensePlate || type;
    if (!hasFilter) { setDisplayVehicles(undefined); return; }

    setDisplayVehicles(
      vehicles.filter((v: Vehicle) => {
        if (brand        && !v.brand?.toLowerCase().includes(brand.toLowerCase()))               return false;
        if (licensePlate && !v.licensePlate?.toLowerCase().includes(licensePlate.toLowerCase())) return false;
        if (type         && v.type !== type)                                                      return false;
        return true;
      }),
    );
  }

  return (
    <TabPage label="Veículos">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Meus Veículos</h2>
        <Link href="/user/vehicle/register" className="px-4 py-2 rounded-xl text-sm font-medium btn-primary btn-hover text-white transition shrink-0">
          + Novo veículo
        </Link>
      </div>

      <FilterBar
        title="Filtrar Veículos"
        fields={FILTER_FIELDS}
        onSearch={handleSearch}
        onClear={() => setDisplayVehicles(undefined)}
      />

      <div className="space-y-4">
        {filtered.length > 0
          ? filtered.map((vehicle: Vehicle) => <VehicleFrame key={vehicle.id} vehicle={vehicle} />)
          : <p className="text-muted">{!vehicles ? "Carregando..." : "Nenhum veículo cadastrado."}</p>
        }
      </div>
    </TabPage>
  );
};

function VehicleFrame({ vehicle }: { vehicle: Vehicle }) {
  const [state, editAction] = useForm(action);
  const [visible, setVisible] = useState(true);
  const label = vehicle.type.toLowerCase().replace(vehicle.type.toLowerCase()[0], vehicle.type[0]);

  useEffect(() => { console.log("insert refresh vehicle function here"); }, [state]);

  if (!visible) return <></>;
  return (
    <EntityFrame
      editTitle={`Editar ${label} ${vehicle.brand}`}
      editFields={[
        { label: "Marca",            name: "brand",           type: "text",   placeholder: "Ex: Toyota",  defaultValue: vehicle.brand,                                required: true },
        { label: "Modelo",           name: "model",           type: "text",   placeholder: "Ex: Corolla", defaultValue: vehicle.model,                                required: true },
        { label: "Placa",            name: "licensePlate",    type: "text",   placeholder: "ABC-1234",    defaultValue: vehicle.licensePlate,                         required: true },
        { label: "Ano de Fabricação",name: "manufactureYear", type: "number", placeholder: "2000",        defaultValue: String(vehicle.manufactureYear.getFullYear()), required: true },
        { label: "Cor",              name: "color",           type: "text",   placeholder: "Ex: Prata",   defaultValue: vehicle.color },
        { label: "Tipo do Veículo",  name: "type",            type: "select", defaultValue: vehicle.type,
          items: [{ value: "CARRO", label: "Carro" }, { value: "MOTO", label: "Moto" }] },
        { label: "Porte",            name: "size",            type: "select", defaultValue: vehicle.size,
          items: [{ value: "PEQUENO", label: "Pequeno" }, { value: "MEDIO", label: "Médio" }, { value: "GRANDE", label: "Grande" }] },
      ]}
      onEdit={(formData) => {
        formData.set("id", String(vehicle.id));
        startTransition(() => { editAction(formData); });
      }}
      deleteTitle="Excluir veículo"
      deleteDescription={`Deseja excluir o veículo ${label} ${vehicle.id} (${vehicle.licensePlate})?`}
      onDelete={async () => {
        const res: ControllerStatusStructureInterface = await deleteVehicle(vehicle.id);
        if (res.success) setVisible(false);
      }}
    >
      <DefaultEntityFrame
        title={`${label} ${vehicle.brand}`}
        description={`Modelo: ${vehicle.model}`}
        tagList={[
          `Placa: ${vehicle.licensePlate}`,
          `Fabricação: ${vehicle.manufactureYear}`,
          `Tamanho: ${sizeMap[vehicle.size]}`,
          `Cor: ${vehicle.color}`,
        ]}
      />
    </EntityFrame>
  );
}

const VehiclesTab = new Tab({ default: "Veículos", page: "Meus Veículos" }, Page);
export default VehiclesTab;
