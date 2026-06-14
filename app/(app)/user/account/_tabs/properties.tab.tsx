"use client";
import { useState, startTransition, useEffect } from "react";
import Tab from "@/classes/TabContainer/Tab";
import TabPage from "@/component/container/TabContainer/TabPage";
import Link from "next/link";
import { usePageContext } from "../page.context";
import EntityFrame from "@/component/container/EntityContainer/EntityFrame";
import DefaultEntityFrame from "@/component/frames/DefaultEntityFrame";
import { Property } from "@classes";
import action from "../_actions/property/edit.action";
import useForm from "@/hooks/useForm";
import { PropertyController } from "@controllers";
import { BrowserService } from "@services";
import FilterBar, { FilterField, FilterValues } from "@/component/filter/FilterBar";

const FILTER_FIELDS: FilterField[] = [
  { key: "name",         label: "Nome",   type: "text", placeholder: "Nome da propriedade" }
];

const Page = () => {
  const { properties } = usePageContext();
  const [state, editAction, pending] = useForm(action);
  const [displayProperties, setDisplayProperties] = useState<Property[] | undefined>(undefined);

  useEffect(() => { console.log("insert refresh property function here"); }, [state]);

  const filtered = displayProperties ?? properties ?? [];

  function handleSearch(values: FilterValues) {
    if (!properties) return;
    const { name, neighborhood } = values;
    const hasFilter = name || neighborhood;
    if (!hasFilter) { setDisplayProperties(undefined); return; }

    setDisplayProperties(
      properties.filter((p: Property) => {
        if (name         && !p.info?.name?.toLowerCase().includes(name.toLowerCase()))                                        return false;
        if (neighborhood && !p.location?.address?.location?.neighborhood?.toLowerCase().includes(neighborhood.toLowerCase())) return false;
        return true;
      }),
    );
  }

  return (
    <TabPage label="Propriedades">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Minhas Propriedades</h2>
        <Link href="property/register" className="px-4 py-2 rounded-xl text-sm font-medium btn-primary btn-hover text-white transition shrink-0">
          + Nova propriedade
        </Link>
      </div>

      <FilterBar
        title="Filtrar Propriedades"
        fields={FILTER_FIELDS}
        onSearch={handleSearch}
        onClear={() => setDisplayProperties(undefined)}
      />

      <div className="space-y-4">
        {filtered.map((property: Property) => (
          <EntityFrame
            key={property.id}
            editTitle={`Editar ${property.info?.name}`}
            editFields={[
              { label: "Nome",          name: "name",          type: "text",   placeholder: "Nome da propriedade",   defaultValue: property.info?.name,                          required: true },
              { label: "Tipo",          name: "type",          type: "text",   placeholder: "Residencial",           defaultValue: property.info?.type },
              { label: "Descrição",     name: "description",   type: "text",   placeholder: "Descreva a propriedade",defaultValue: property.info?.description },
              { label: "Capacidade",    name: "totalCapacity", type: "number", placeholder: "10 Vagas",              defaultValue: String(property.info?.totalCapacity) },
              { label: "CEP",           name: "zipCode",       type: "number", placeholder: "01001000",              defaultValue: property?.location?.address?.location?.zipCode },
              { label: "Número",        name: "number",        type: "text",   placeholder: "48",                    defaultValue: property?.location?.address?.location?.number },
              { label: "Complemento",   name: "complement",    type: "text",   placeholder: "Casa N",                defaultValue: property?.location?.address?.location?.complement },
              { label: "Rua",           name: "street",        type: "text",   placeholder: "Alameda das Flores",    defaultValue: property?.location?.address?.location?.street },
              { label: "Bairro",        name: "neighborhood",  type: "text",   placeholder: "Centro",                defaultValue: property?.location?.address?.location?.neighborhood },
            ]}
            onEdit={(formData) => {
              formData.set("id", String(property.id));
              startTransition(() => { editAction(formData); });
            }}
            deleteTitle="Excluir propriedade"
            deleteDescription={`Deseja excluir a propriedade "${property.info?.name}"? Todas as vagas associadas também serão removidas.`}
            onDelete={async () => {
              const res = await PropertyController.deleteById(BrowserService.getToken(), property.id);
              if (res) console.log("property has been deleted.");
            }}
          >
            <DefaultEntityFrame
              title={property.info?.name}
              description={property.info?.description}
              redirectTo={`/user/property/${property.id}`}
            />
          </EntityFrame>
        ))}
      </div>
    </TabPage>
  );
};

const PropertiesTab = new Tab({ default: "Propriedades", page: "Minhas Propriedades" }, Page);
export default PropertiesTab;
