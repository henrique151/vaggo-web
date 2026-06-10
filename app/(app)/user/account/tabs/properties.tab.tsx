import Tab from "@/classes/TabContainer/Tab";
import TabPage from "@/component/container/TabContainer/TabPage";
import Link from "next/link";
import { usePageContext } from "../page.context";
import EntityFrame from "@/component/container/EntityContainer/EntityFrame";
import DefaultEntityFrame from "@/component/frames/DefaultEntityFrame";

const Page = () => {
  const { properties } = usePageContext();

  return (
    <TabPage label="Propriedades">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Minhas Propriedades</h2>

        <Link
          href="property/register"
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
          + Nova propriedade
        </Link>
      </div>

      <div className="space-y-4">
        {(properties &&
          properties.map((property) => (
            <EntityFrame
              key={property.id}
              editTitle={`Editar ${property.name}`}
              editFields={[
                { label: "Nome", name: "name", type: "text", placeholder: "Nome da propriedade", defaultValue: property.name, required: true },
                { label: "Descrição", name: "description", type: "text", placeholder: "Descreva a propriedade", defaultValue: property.description },
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
                redirectTo={`/user/property/${property.id}`}
              />
            </EntityFrame>
          ))) || null}
      </div>
    </TabPage>
  );
};

const PropertiesTab = new Tab(
  { default: "Propriedades", page: "Minhas Propriedades" },
  Page,
);

export default PropertiesTab;
