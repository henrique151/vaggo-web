import Tab from "@/classes/TabContainer/Tab";
import TabPage from "@/component/container/TabContainer/TabPage";
import { usePageContext } from "../_context/page.context";
import EntityItem from "@/component/container/EntityContainer/EntityItem";
import StatusBadge from "@/component/ui/StatusDisplay";
import { redirect } from "next/navigation";

const Page = () => {
  const { property } = usePageContext();

  return (
    <TabPage label="Perfil">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">
          Informações sobre a Propriedade
        </h2>

        <div className="flex items-center gap-3">
          <StatusBadge
            conditionValue={property?.isActive}
            conditionTable={{ true: "green", false: "red" }}
            statusLabelTable={{ green: "Ativo", red: "Inativo" }}
            defaultValue="red"
          />

          <button
            // onClick={() => setIsEditing(true)}
            onClick={() => redirect(`${property.id}/edit`)}
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
            Editar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <EntityItem
          label="Nome"
          value={property?.name || "Nome da Propriedade"}
        />
        <EntityItem
          label="Descrição"
          value={property?.description || "Descrição da Propriedade"}
        />
        <EntityItem label="Tipo" value={property?.type || "Tipo"} />
        <EntityItem
          label="Capacidadde"
          value={
            (property?.totalCapacity as unknown as string) + " Vagas" || "0"
          }
        />
        {/*<EntityItem
          label="Nascimento"
          value={property?.person.birthDate || "XX/XX/XXXX"}
        />
        <EntityItem
          label="Último acesso"
          value={
            showLastLoginDetails(property?.lastLogin || new Date(2026)) ||
            "Data"
          }
        />*/}
      </div>
    </TabPage>
  );
};

// function showLastLoginDetails(userLastLogin: Date) {
//   return `${userLastLogin.getDate()}/${userLastLogin.getMonth().toString().padStart(2, "0")}/${userLastLogin.getFullYear()} -- ${userLastLogin.getHours()}:${userLastLogin.getMinutes().toString().padStart(2, "0")}`;
// }

const InformationTab = new Tab(
  { default: "Informações", page: "Informações" },
  Page,
);

export default InformationTab;
