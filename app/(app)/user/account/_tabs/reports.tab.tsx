import Tab from "@/classes/TabContainer/Tab";
import TabPage from "@/component/container/TabContainer/TabPage";
import { usePageContext } from "../page.context";
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
          const statusLabel = report.status
            .toLowerCase()
            .replace(report.status.toLowerCase()[0], report.status[0]);

          return (
            <EntityFrame
              key={report.id}
              editTitle={`Editar Denúncia #${report.id.toString().padStart(2, "0")}`}
              editFields={[
                { label: "Motivo", name: "reason", type: "text", placeholder: "Descreva o motivo", defaultValue: report.reason, required: true },
                {
                  label: "Tipo", name: "targetType", type: "select",
                  defaultValue: report.target.type,
                  items: [
                    { value: "SPOT", label: "Vaga" },
                    { value: "CHAT", label: "Conversa" },
                  ],
                },
              ]}
              onEdit={(formData) => {
                // TODO: wire to update report action
                console.log("edit report", report.id, Object.fromEntries(formData));
              }}
              deleteTitle="Excluir denúncia"
              deleteDescription={`Deseja excluir a denúncia #${report.id.toString().padStart(2, "0")}?`}
              onDelete={() => {
                // TODO: wire to delete report action
                console.log("delete report", report.id);
              }}
            >
              <DefaultEntityFrame
                title={`Denúncia #${report.id.toString().padStart(2, "0")}`}
                description={`Motivo: ${report.reason}`}
                tagList={[
                  `Status: ${statusLabel}`,
                  `Tipo: ${{ SPOT: "Vaga", CHAT: "Conversa" }[report.target.type]}`,
                  `Registrado em: ${report.date.created.toLocaleDateString("pt-BR")}`,
                  `Relacionado: ${report.spot.property.name} - ${report.spot.identifier}`,
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
