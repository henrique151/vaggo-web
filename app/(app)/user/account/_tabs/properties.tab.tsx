import Tab from "@/classes/TabContainer/Tab";
import TabPage from "@/component/container/TabContainer/TabPage";
import Link from "next/link";
import { usePageContext } from "../page.context";
import EntityFrame from "@/component/container/EntityContainer/EntityFrame";
import DefaultEntityFrame from "@/component/frames/DefaultEntityFrame";
import { Property } from "@classes";
import { startTransition, useEffect } from "react";
import action from "../_actions/property/edit.action";
import useForm from "@/hooks/useForm";
import { PropertyController } from "@controllers";
import { BrowserService } from "@services";

const Page = () => {
  const { properties } = usePageContext();
  const [state, editAction, pending] = useForm(action);

  useEffect(() => {
    console.log("insert refresh property function here");
  }, [state]);
  // const

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
          properties.map((property: Property) => (
            <EntityFrame
              key={property.id}
              editTitle={`Editar ${property.info?.name}`}
              editFields={[
                {
                  label: "Nome",
                  name: "name",
                  type: "text",
                  placeholder: "Nome da propriedade",
                  defaultValue: property.info?.name,
                  required: true,
                },
                {
                  label: "Tipo",
                  name: "type",
                  type: "text",
                  // items: [{label: "Residencial", value: ""}]
                  placeholder: "Residencial",
                  defaultValue: property.info?.type,
                },
                {
                  label: "Descrição",
                  name: "description",
                  type: "text",
                  placeholder: "Descreva a propriedade",
                  defaultValue: property.info?.description,
                },
                {
                  label: "Capacidade Total",
                  name: "totalCapacity",
                  type: "number",
                  placeholder: "10 Vagas",
                  defaultValue: String(property.info?.totalCapacity),
                },
                {
                  label: "CEP",
                  name: "zipCode",
                  type: "number",
                  placeholder: "01001000",
                  defaultValue: property?.location?.address?.location?.zipCode,
                },
                {
                  label: "Número da Propriedade",
                  name: "number",
                  type: "text",
                  placeholder: "48",
                  defaultValue: property?.location?.address?.location?.number,
                },
                {
                  label: "Complemento",
                  name: "complement",
                  type: "text",
                  placeholder: "Casa N",
                  defaultValue:
                    property?.location?.address?.location?.complement,
                },
                {
                  label: "Rua",
                  name: "street",
                  type: "text",
                  placeholder: "Alameda das Flores",
                  defaultValue: property?.location?.address?.location?.street,
                },
                {
                  label: "Bairro",
                  name: "neighborhood",
                  type: "text",
                  placeholder: "Centro",
                  defaultValue:
                    property?.location?.address?.location?.neighborhood,
                },
              ]}
              onEdit={(formData) => {
                formData.set("id", String(property.id));
                startTransition(() => {
                  editAction(formData);
                });
              }}
              deleteTitle="Excluir propriedade"
              deleteDescription={`Deseja excluir a propriedade "${property.info?.name}"? Todas as vagas associadas também serão removidas.`}
              onDelete={async () => {
                const res = await PropertyController.deleteById(
                  BrowserService.getToken(),
                  property.id,
                );
                console.log(res);
                if (res) {
                  console.log("property has been deleted.");
                }
                console.log("delete property", property.id);
              }}
            >
              <DefaultEntityFrame
                title={property.info?.name}
                description={property.info?.description}
                redirectTo={`/user/property/${property.id}`}
              />
            </EntityFrame>
          ))) ||
          null}
      </div>
    </TabPage>
  );
};

const PropertiesTab = new Tab(
  { default: "Propriedades", page: "Minhas Propriedades" },
  Page,
);

export default PropertiesTab;
