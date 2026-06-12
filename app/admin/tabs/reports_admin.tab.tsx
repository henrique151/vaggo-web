import Tab from "@/classes/TabContainer/Tab";
import TabPage from "@/component/container/TabContainer/TabPage";
import EntityFrame from "@/component/container/EntityContainer/EntityFrame";
import DefaultEntityFrame from "@/component/frames/DefaultEntityFrame";

// TODO: substituir pelo tipo real de Report e pelo hook de dados
type AdminReport = {
  id: number;
  reason: string;
  status: "PENDENTE" | "APROVADA" | "RECUSADA";
  targetType: "SPOT" | "CHAT";
  reporterName: string;
  targetName: string;
  createdAt: Date;
};

const statusLabel = {
  PENDENTE: "Pendente",
  APROVADA: "Aprovada",
  RECUSADA: "Recusada",
} as const;

const Page = () => {
  // TODO: const { reports } = useAdminContext();
  const reports: AdminReport[] = []; // placeholder

  return (
    <TabPage label="Denúncias">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Denúncias</h2>
      </div>

      <div className="space-y-4">
        {reports.length > 0 ? (
          reports.map((report) => (
            <EntityFrame
              key={report.id}
              editTitle={`Denúncia #${report.id.toString().padStart(2, "0")}`}
              editFields={[
                { label: "Motivo", name: "reason", type: "text", placeholder: "Descreva o motivo", defaultValue: report.reason, required: true },
                {
                  label: "Decisão", name: "status", type: "select",
                  defaultValue: report.status,
                  items: [
                    { value: "PENDENTE", label: "Pendente" },
                    { value: "APROVADA", label: "Aprovar" },
                    { value: "RECUSADA", label: "Recusar" },
                  ],
                },
                {
                  label: "Tipo do alvo", name: "targetType", type: "select",
                  defaultValue: report.targetType,
                  items: [
                    { value: "SPOT", label: "Vaga" },
                    { value: "CHAT", label: "Conversa" },
                  ],
                },
              ]}
              onReanalise={() => {}}
              onEdit={(formData) => {
                // TODO: wire to update report action (approve/reject)
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
                  `Status: ${statusLabel[report.status]}`,
                  `Tipo: ${{ SPOT: "Vaga", CHAT: "Conversa" }[report.targetType]}`,
                  `Denunciante: ${report.reporterName}`,
                  `Alvo: ${report.targetName}`,
                  `Data: ${report.createdAt.toLocaleDateString("pt-BR")}`,
                ]}
              />
            </EntityFrame>
          ))
        ) : (
          <p className="text-muted">Nenhuma denúncia encontrada.</p>
        )}
      </div>
    </TabPage>
  );
};

const ReportsTab = new Tab({ default: "Denúncias", page: "Denúncias" }, Page);

export default ReportsTab;
