import { useState } from "react";
import Tab from "@/classes/TabContainer/Tab";
import TabPage from "@/component/container/TabContainer/TabPage";
import EntityFrame from "@/component/container/EntityContainer/EntityFrame";
import DefaultEntityFrame from "@/component/frames/DefaultEntityFrame";
import { usePageContext } from "../_context/page.context";
import { User } from "@classes";
import { UserController } from "@controllers";
import { BrowserService } from "@services";
import FilterBar, { FilterField, FilterValues } from "@/component/filter/FilterBar";

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

const FILTER_FIELDS: FilterField[] = [
  { key: "name",  label: "Nome",   type: "text",  placeholder: "Ex: João Silva" },
  { key: "email", label: "E-mail", type: "email", placeholder: "email@exemplo.com" },
  {
    key: "permissionLevel", label: "Cargo", type: "select",
    options: [
      { value: "1", label: "Usuário" },
      { value: "3", label: "Administrador" },
    ],
  },
  {
    key: "active", label: "Status", type: "select",
    options: [
      { value: "true",  label: "Ativo" },
      { value: "false", label: "Inativo" },
    ],
  },
];

const Page = () => {
  const { users, refreshUsers } = usePageContext();
  const [displayUsers, setDisplayUsers] = useState<User[] | undefined>(undefined);
  console.log(users);
  // const users: AdminUser[] = []; // placeholder

  const filtered = displayUsers ?? users;

  const handleSearch = (values: FilterValues) => {
    const { name, email, permissionLevel, active } = values;
    const hasFilter = name || email || permissionLevel || active;
    if (!hasFilter) { setDisplayUsers(undefined); return; }

    setDisplayUsers(
      (users ?? []).filter((u: User) => {
        if (name             && !u.person.name.toLowerCase().includes(name.toLowerCase()))   return false;
        if (email            && !u.email.toLowerCase().includes(email.toLowerCase()))        return false;
        if (permissionLevel  && u.permissionLevel !== permissionLevel)                       return false;
        if (active           && String(u.person.status.active) !== active)                  return false;
        return true;
      }),
    );
  };

  return (
    <TabPage label="Usuários">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Usuários</h2>
      </div>

      <FilterBar
        title="Filtrar Usuários"
        fields={FILTER_FIELDS}
        onSearch={handleSearch}
        onClear={() => setDisplayUsers(undefined)}
      />

      <div className="space-y-4">
        {filtered?.length > 0 ? (
          filtered.map((user: User) => (
            <EntityFrame
              key={user.id}
              editTitle={`Editar ${user.person.name}`}
              editFields={[
                {
                  label: "Nome",
                  name: "name",
                  type: "text",
                  placeholder: "Nome completo",
                  defaultValue: user.person.name,
                  required: true,
                },
                {
                  label: "Email",
                  name: "email",
                  type: "email",
                  placeholder: "email@email.com",
                  defaultValue: user.email,
                  required: true,
                },
                {
                  label: "Telefone",
                  name: "phone",
                  type: "tel",
                  placeholder: "(11) 91234-5678",
                  defaultValue: user.person.phone,
                },
                {
                  label: "Senha",
                  name: "password",
                  type: "password",
                  placeholder: "Password123!",
                  defaultValue: "Password123!",
                },
                {
                  label: "Cargo",
                  name: "permissionLevel",
                  type: "select",
                  defaultValue: "1",
                  items: [
                    { value: "1", label: "Usuário" },
                    { value: "3", label: "Administrador" },
                  ],
                },
                {
                  label: "Data de Nascimento",
                  name: "birthDate",
                  type: "date",
                  defaultValue: `${user.person.date.birth.toISOString().substring(0, 10)}`,
                },
                {
                  label: "Gênero",
                  name: "gender",
                  type: "select",
                  defaultValue: String(user.person.status.active),
                  items: [
                    { value: "M", label: "M" },
                    { value: "F", label: "F" },
                    { value: "O", label: "O" },
                  ],
                },
              ]}
              onEdit={async (formData) => {
                const res = await UserController.edit(
                  BrowserService.getToken(),
                  user.id,
                  formData,
                  true,
                );
                if (res) {
                  refreshUsers();
                }
                // console.log("edit user", user.id, Object.fromEntries(formData));
              }}
              deleteTitle="Excluir usuário"
              deleteDescription={`Deseja excluir o usuário "${user.person.name}"? Todos os dados associados serão removidos.`}
              onDelete={async () => {
                // TODO: wire to delete user action
                const res = await UserController.deleteById(
                  BrowserService.getToken(),
                  user.id,
                  true,
                );
                if (res) {
                  refreshUsers();
                }
                console.log("delete user", user.id);
              }}
            >
              <DefaultEntityFrame
                title={user.person.name}
                description={user.email}
                tagList={[
                  `Cargo: ${user.permissionLevel === "3" ? "Administrador" : "Usuário"}`,
                  `Status: ${user.person.status.active ? "Ativo" : "Inativo"}`,
                  ...(user.person.phone
                    ? [`Telefone: ${user.person.phone}`]
                    : []),
                  ...(user.person.cpf ? [`CPF: ${user.person.cpf}`] : []),
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