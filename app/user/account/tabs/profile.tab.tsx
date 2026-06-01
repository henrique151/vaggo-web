import Tab from "@/classes/TabContainer/Tab";
import TabPage from "@/component/container/TabContainer/TabPage";
import { usePageContext } from "../page.context";
import EntityItem from "@/component/container/EntityContainer/EntityItem";
import StatusBadge from "@/component/ui/StatusDisplay";

const Page = () => {
  const { user } = usePageContext();

  return (
    <TabPage label="Perfil">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Meu Perfil</h2>

        <div className="flex items-center gap-3">
          <StatusBadge
            conditionValue={user?.person.isActive}
            conditionTable={{ true: "green", false: "red" }}
            statusLabelTable={{ green: "Ativo", red: "Inativo" }}
            defaultValue="red"
          />

          <button
            // onClick={() => setIsEditing(true)}
            onClick={() => console.log("setIsEditing")}
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
        <EntityItem label="Nome" value={user?.person.name || "Usuário"} />
        <EntityItem label="Email" value={user?.email || "email@email.com"} />
        <EntityItem
          label="Telefone"
          value={user?.person.phone || "(11) 12345-5678"}
        />
        <EntityItem label="CPF" value={user?.person.cpf || "---.---.------"} />
        <EntityItem
          label="Nascimento"
          value={user?.person.birthDate || "XX/XX/XXXX"}
        />
        <EntityItem
          label="Último acesso"
          value={
            showLastLoginDetails(user?.lastLogin || new Date(2026)) || "Data"
          }
        />
      </div>
    </TabPage>
  );
};

function showLastLoginDetails(userLastLogin: Date) {
  return `${userLastLogin.getDate()}/${userLastLogin.getMonth().toString().padStart(2, "0")}/${userLastLogin.getFullYear()} -- ${userLastLogin.getHours()}:${userLastLogin.getMinutes().toString().padStart(2, "0")}`;
}

const ProfileTab = new Tab({ default: "Perfil", page: "Meu Perfil" }, Page);

export default ProfileTab;
