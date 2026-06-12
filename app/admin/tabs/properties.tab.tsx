import Tab from "@/classes/TabContainer/Tab";
import TabPage from "@/component/container/TabContainer/TabPage";
import EntityFrame from "@/component/container/EntityContainer/EntityFrame";
import DefaultEntityFrame from "@/component/frames/DefaultEntityFrame";

// TODO: substituir pelo tipo real de Property e pelo hook de dados
type AdminProperty = {
  id: number;
  name: string;
  description?: string;
  ownerName: string;
  spotsCount: number;
  address?: string;
};

const Page = () => {
  // TODO: const { properties } = useAdminContext();
  const properties: AdminProperty[] = []; // placeholder

  return (
    <TabPage label="Propriedades">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Propriedades</h2>
      </div>

      <div className="space-y-4">
        {properties.length > 0 ? (
          properties.map((property) => (
            <EntityFrame
              key={property.id}
              editTitle={`Editar ${property.name}`}
              editFields={[
                { label: "Nome", name: "name", type: "text", placeholder: "Nome da propriedade", defaultValue: property.name, required: true },
                { label: "Descrição", name: "description", type: "text", placeholder: "Descreva a propriedade", defaultValue: property.description },
                { label: "Endereço", name: "address", type: "text", placeholder: "Rua, número, cidade", defaultValue: property.address },
              ]}
              onEdit={(formData) => {
                // TODO: wire to update property action
                console.log("edit property", property.id, Object.fromEntries(formData));
              }}
              deleteTitle="Excluir propriedade"
              deleteDescription={`Deseja excluir a propriedade "${property.name}"? Todas as vagas associadas também serão removidas.`}
              onDelete={() => {
                // TODO: wire to delete property action
                console.log("delete property", property.id);
              }}
            >
              <DefaultEntityFrame
                title={property.name}
                description={property.description}
                redirectTo={`/admin/property/${property.id}`}
                tagList={[
                  `Dono: ${property.ownerName}`,
                  `Vagas: ${property.spotsCount}`,
                  ...(property.address ? [`Endereço: ${property.address}`] : []),
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

const PropertiesTab = new Tab({ default: "Propriedades", page: "Propriedades" }, Page);

export default PropertiesTab;
