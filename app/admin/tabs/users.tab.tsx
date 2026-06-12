import Tab from "@/classes/TabContainer/Tab";
import TabPage from "@/component/container/TabContainer/TabPage";
import EntityFrame from "@/component/container/EntityContainer/EntityFrame";
import DefaultEntityFrame from "@/component/frames/DefaultEntityFrame";

// TODO: substituir pelo tipo real de User e pelo hook de dados
type AdminUser = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  cpf?: string;
  isActive: boolean;
  role: string;
};

const Page = () => {
  // TODO: const { users } = useAdminContext();
  const users: AdminUser[] = []; // placeholder

  return (
    <TabPage label="Usuários">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Usuários</h2>
      </div>

      <div className="space-y-4">
        {users.length > 0 ? (
          users.map((user) => (
            <EntityFrame
              key={user.id}
              editTitle={`Editar ${user.name}`}
              editFields={[
                { label: "Nome", name: "name", type: "text", placeholder: "Nome completo", defaultValue: user.name, required: true },
                { label: "Email", name: "email", type: "email", placeholder: "email@email.com", defaultValue: user.email, required: true },
                { label: "Telefone", name: "phone", type: "tel", placeholder: "(11) 91234-5678", defaultValue: user.phone },
                { label: "CPF", name: "cpf", type: "text", placeholder: "000.000.000-00", defaultValue: user.cpf },
                {
                  label: "Cargo", name: "role", type: "select",
                  defaultValue: user.role,
                  items: [
                    { value: "USER", label: "Usuário" },
                    { value: "ADMIN", label: "Administrador" },
                  ],
                },
                {
                  label: "Status", name: "isActive", type: "select",
                  defaultValue: String(user.isActive),
                  items: [
                    { value: "true", label: "Ativo" },
                    { value: "false", label: "Inativo" },
                  ],
                },
              ]}
              onEdit={(formData) => {
                // TODO: wire to update user action
                console.log("edit user", user.id, Object.fromEntries(formData));
              }}
              deleteTitle="Excluir usuário"
              deleteDescription={`Deseja excluir o usuário "${user.name}"? Todos os dados associados serão removidos.`}
              onDelete={() => {
                // TODO: wire to delete user action
                console.log("delete user", user.id);
              }}
            >
              <DefaultEntityFrame
                title={user.name}
                description={user.email}
                tagList={[
                  `Cargo: ${user.role === "ADMIN" ? "Administrador" : "Usuário"}`,
                  `Status: ${user.isActive ? "Ativo" : "Inativo"}`,
                  ...(user.phone ? [`Telefone: ${user.phone}`] : []),
                  ...(user.cpf ? [`CPF: ${user.cpf}`] : []),
                ]}
              />
            </EntityFrame>
          ))
        ) : (
          <p className="text-muted">Nenhum usuário encontrado.</p>
        )}
      </div>
    </TabPage>
  );
};

const UsersTab = new Tab({ default: "Usuários", page: "Usuários" }, Page);

export default UsersTab;
