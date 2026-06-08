import Tab from "@/classes/TabContainer/Tab";
import TabPage from "@/component/container/TabContainer/TabPage";
// import { usePageContext } from "../page.context";
import EntityItem from "@/component/container/EntityContainer/EntityItem";
import StatusBadge from "@/component/ui/StatusDisplay";

const Page = () => {

  return (
    <TabPage label="Perfil">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Denúncias</h2>

        <div className="flex items-center gap-3">
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      </div>
    </TabPage>
  );
};

const ReportsTab = new Tab({ default: "Denúncias", page: "Denúncias" }, Page);

export default ReportsTab;
