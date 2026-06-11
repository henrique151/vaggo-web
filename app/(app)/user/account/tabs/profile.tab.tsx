import Tab from "@/classes/TabContainer/Tab";
import TabPage from "@/component/container/TabContainer/TabPage";
import { usePageContext } from "../page.context";
import EntityItem from "@/component/container/EntityContainer/EntityItem";
import StatusBadge from "@/component/ui/StatusDisplay";
import EntityFrame from "@/component/container/EntityContainer/EntityFrame";

const Page = () => {
  const { user } = usePageContext();

  return (
    <TabPage label="Perfil">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Meu Perfil</h2>

        <StatusBadge
          conditionValue={user?.person.isActive}
          conditionTable={{ true: "green", false: "red" }}
          statusLabelTable={{ green: "Ativo", red: "Inativo" }}
          defaultValue="red"
        />
      </div>

      <EntityFrame
        editTitle="Editar Perfil"
        editFields={[
          { label: "Nome", name: "name", type: "text", placeholder: "Seu nome completo", defaultValue: user?.person.name, required: true },
          { label: "Email", name: "email", type: "email", placeholder: "email@email.com", defaultValue: user?.email, required: true },
          { label: "Telefone", name: "phone", type: "tel", placeholder: "(11) 91234-5678", defaultValue: user?.person.phone },
          { label: "CPF", name: "cpf", type: "text", placeholder: "000.000.000-00", defaultValue: user?.person.cpf },
          { label: "Data de Nascimento", name: "birthDate", type: "date", defaultValue: user?.person.birthDate },
        ]}
        onEdit={(formData) => {
          // TODO: wire to update user/profile action
          console.log("edit profile", Object.fromEntries(formData));
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <EntityItem label="Nome" value={user?.person.name || "Usuário"} />
          <EntityItem label="Email" value={user?.email || "email@email.com"} />
          <EntityItem label="Telefone" value={user?.person.phone || "(11) 12345-5678"} />
          <EntityItem label="CPF" value={user?.person.cpf || "---.---.------"} />
          <EntityItem label="Nascimento" value={user?.person.birthDate || "XX/XX/XXXX"} />
          <EntityItem
            label="Último acesso"
            value={showLastLoginDetails(user?.lastLogin || new Date(2026)) || "Data"}
          />
        </div>
      </EntityFrame>
    </TabPage>
  );
};

function showLastLoginDetails(userLastLogin: Date) {
  return `${userLastLogin.getDate()}/${userLastLogin.getMonth().toString().padStart(2, "0")}/${userLastLogin.getFullYear()} -- ${userLastLogin.getHours()}:${userLastLogin.getMinutes().toString().padStart(2, "0")}`;
}

const ProfileTab = new Tab({ default: "Perfil", page: "Meu Perfil" }, Page);

export default ProfileTab;
