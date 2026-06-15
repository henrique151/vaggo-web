import { useState } from "react";
import Tab from "@/classes/TabContainer/Tab";
import TabPage from "@/component/container/TabContainer/TabPage";
import EntityFrame from "@/component/container/EntityContainer/EntityFrame";
import DefaultEntityFrame from "@/component/frames/DefaultEntityFrame";
import { usePageContext } from "../_context/page.context";
import { Property } from "@classes";
import { APIService, BrowserService } from "@services";
import FilterBar, { FilterField, FilterValues } from "@/component/filter/FilterBar";

// TODO: substituir pelo tipo real de Property e pelo hook de dados
type AdminProperty = {
  id: number;
  name: string;
  description?: string;
  ownerName: string;
  spotsCount: number;
  address?: string;
};

const FILTER_FIELDS: FilterField[] = [
  { key: "name",         label: "Nome",   type: "text", placeholder: "Nome da propriedade" },
];

const Page = () => {
  const { properties, refreshProperties } = usePageContext();
  const [displayProperties, setDisplayProperties] = useState<Property[] | undefined>(undefined);

  console.log(properties);

  const filtered = displayProperties ?? properties;

  const handleSearch = (values: FilterValues) => {
    const { name, neighborhood } = values;
    const hasFilter = name || neighborhood;
    if (!hasFilter) { setDisplayProperties(undefined); return; }

    setDisplayProperties(
      (properties ?? []).filter((p: Property) => {
        if (name         && !p.info?.name?.toLowerCase().includes(name.toLowerCase()))                                        return false;
        if (neighborhood && !p.location?.address?.location?.neighborhood?.toLowerCase().includes(neighborhood.toLowerCase())) return false;
        return true;
      }),
    );
  };

  return (
    <TabPage label="Propriedades">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Propriedades</h2>
      </div>

      <FilterBar
        title="Filtrar Propriedades"
        fields={FILTER_FIELDS}
        onSearch={handleSearch}
        onClear={() => setDisplayProperties(undefined)}
      />

      <div className="space-y-4">
        {filtered?.length > 0 ? (
          filtered.map((property?: Property) => (
            <EntityFrame
              key={property?.id}
              editTitle={`Editar ${property?.info?.name}`}
              editFields={[
                {
                  label: "Nome",
                  name: "name",
                  type: "text",
                  placeholder: "Nome da propriedade",
                  defaultValue: property?.info?.name,
                  required: true,
                },
                {
                  label: "Tipo",
                  name: "type",
                  type: "text",
                  placeholder: "Residencial",
                  defaultValue: property?.info?.type,
                  required: true,
                },
                {
                  label: "Descrição",
                  name: "description",
                  type: "text",
                  placeholder: "Descreva a propriedade",
                  defaultValue: property?.info?.description,
                },
                {
                  label: "Ativo?",
                  name: "isActive",
                  type: "select",
                  items: [
                    { value: "true", label: "Sim" },
                    { value: "false", label: "Não" },
                  ],
                  defaultValue: String(property?.status?.active),
                },
                {
                  label: "Rua",
                  name: "street",
                  type: "text",
                  placeholder: "Alameda dos Limões",
                  defaultValue: property?.location?.address?.location?.street,
                },
                {
                  label: "Número",
                  name: "number",
                  type: "text",
                  placeholder: "1096",
                  defaultValue: property?.location?.address?.location?.number,
                },
                {
                  label: "Bairro",
                  name: "neighborhood",
                  type: "text",
                  placeholder: "Bairro das Amoras",
                  defaultValue:
                    property?.location.address.location.neighborhood,
                },
                {
                  label: "CEP",
                  name: "zipCode",
                  type: "text",
                  placeholder: "30075694",
                  defaultValue: property?.location.address.location.zipCode,
                },
                // {
                //   label: "Cidade",
                //   name: "cityId",
                //   type: "number",
                //   placeholder: "1",
                //   defaultValue: String(property?.location.address.city.id),
                // },
                // {
                //   label: "Capacidade Total",
                //   name: "totalCapacity",
                //   type: "number",
                //   placeholder: "10 Vagas",
                //   defaultValue: String(property?.info?.totalCapacity),
                // },
                // {
                //   label: "Capacidade Total",
                //   name: "totalCapacity",
                //   type: "number",
                //   placeholder: "10 Vagas",
                //   defaultValue: String(property?.info?.totalCapacity),
                // },
              ]}
              onEdit={async (formData) => {
                // TODO: wire to update property action
                formData.set("cityId", "1");
                const res = await APIService.genericEditRequest(
                  BrowserService.getToken(),
                  "admin/properties",
                  property.id,
                  formData,
                  "json",
                );

                if (res) {
                  refreshProperties();
                }

                console.log(
                  "edit property",
                  property?.id,
                  Object.fromEntries(formData),
                );
              }}
              deleteTitle="Excluir propriedade"
              deleteDescription={`Deseja excluir a propriedade "${property?.info?.name}"? Todas as vagas associadas também serão removidas.`}
              onDelete={async () => {
                // TODO: wire to delete property action
                const res = await APIService.genericDeleteRequest(
                  BrowserService.getToken(),
                  "admin/properties",
                  property.id,
                );
                if (res) {
                  refreshProperties();
                }
                console.log("delete property", property?.id);
              }}
            >
              <DefaultEntityFrame
                title={property?.info?.name || "Propriedade"}
                description={property?.info?.description}
                redirectTo={`/admin/property/${property?.id}`}
                tagList={[
                  // `Dono: ${"Dono"}`,
                  // `Vagas: ${"Informações"}`,
                  ...(property?.location?.address
                    ? [
                        `Endereço: ${property?.location?.address.location.street}, ${property?.location?.address.location.number} - ${property?.location?.address.location.neighborhood}`,
                      ]
                    : []),
                ]}
              />
            </EntityFrame>
          ))
        ) : (
          <p className="text-muted">Nenhuma propriedade encontrada.</p>
        )}
      </div>
    </TabPage>
  );
};

const PropertiesTab = new Tab(
  { default: "Propriedades", page: "Propriedades" },
  Page,
);

export default PropertiesTab;