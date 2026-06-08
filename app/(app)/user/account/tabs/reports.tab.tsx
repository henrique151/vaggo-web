import Tab from "@/classes/TabContainer/Tab";
import TabPage from "@/component/container/TabContainer/TabPage";
import { usePageContext } from "../page.context";
import { EntityCard } from "@/component/container/EntityContainer/EntityCard";
import Link from "next/link";
import EntityFrame from "@/component/container/EntityContainer/EntityFrame";
import DefaultEntityFrame from "@/component/frames/DefaultEntityFrame";

const Page = () => {
  const { reports } = usePageContext();

  return (
    <TabPage label="Denúncias">
      <div className="flex items-center justify-between mb-6 bg-base">
        <h2 className="text-2xl font-semibold">Minhas Denúncias</h2>
      </div>

      <div className="space-y-4">
        {reports?.map((report) => {
          return (
            <EntityFrame key={report.id}>
              <DefaultEntityFrame
                key={report.id}
                title={`Denúncia #${report.id.toString().padStart(2, "0")}`}
                // title={`${report.toLowerCase().replace(report.type.toLowerCase()[0], report.type[0])} ${report.brand}`}
                description={`Motivo: ${report.reason}`}
                tagList={[
                  `Status: ${report.status.toLowerCase().replace(report.status.toLowerCase()[0], report.status[0])}`,
                  `Tipo: ${{ SPOT: "Vaga", CHAT: "Conversa" }[report.target.type]}`,
                  `Registrado em: ${report.date.created.toLocaleDateString("pt-BR")}`,
                  `Relacionado: ${report.spot.property.name} - ${report.spot.identifier}`, //replace with other types
                ]}
              />
            </EntityFrame>
          );
        }) || <p>Nenhuma Denúncia registrada no momento.</p>}
      </div>
    </TabPage>
  );
};

const ReportsTab = new Tab(
  { default: "Denúncias", page: "Minhas Denúncias" },
  Page,
);

export default ReportsTab;
