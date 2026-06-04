import Tab from "@/classes/TabContainer/Tab";
import TabPage from "@/component/container/TabContainer/TabPage";
import { usePageContext } from "../_context/page.context";
import EntityItem from "@/component/container/EntityContainer/EntityItem";
import StatusBadge from "@/component/ui/StatusDisplay";
import { useRouter } from "next/navigation";

const Page = () => {
  const { property } = usePageContext();
  const router = useRouter();

  // attach editing window for editing a spot individually
  return (
    <TabPage label="Perfil">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Vagas Registradas</h2>

        <div className="flex items-center gap-3">
          <button
            // onClick={() => setIsEditing(true)}
            onClick={() => router.push(`${property.id}/new-spot`)}
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
            cursor-pointer
          "
          >
            + Adicionar
          </button>
        </div>
      </div>

      <div></div>
    </TabPage>
  );
};

// function showLastLoginDetails(userLastLogin: Date) {
//   return `${userLastLogin.getDate()}/${userLastLogin.getMonth().toString().padStart(2, "0")}/${userLastLogin.getFullYear()} -- ${userLastLogin.getHours()}:${userLastLogin.getMinutes().toString().padStart(2, "0")}`;
// }

const SpotsTab = new Tab({ default: "Vagas", page: "Vagas" }, Page);

export default SpotsTab;
