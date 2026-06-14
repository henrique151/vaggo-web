import Tab from "@/classes/TabContainer/Tab";
import TabPage from "@/component/container/TabContainer/TabPage";
import EntityFrame from "@/component/container/EntityContainer/EntityFrame";
import DefaultEntityFrame from "@/component/frames/DefaultEntityFrame";
import { usePageContext } from "../_context/page.context";
import { ReportData } from "@classes";
import { APIService, BrowserService } from "@services";

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
  const { reports, refreshReports } = usePageContext();
  console.log(reports);
  // const reports: AdminReport[] = []; // placeholder

  return (
    <TabPage label="Denúncias">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Denúncias</h2>
      </div>

      <div className="space-y-4">
        {reports?.length > 0 ? (
          reports.map((report: ReportData) => (
            <EntityFrame
              key={report.id}
              editTitle={`Alterar Status de Denúncia #${report.id.toString().padStart(2, "0")}`}
              editFields={[
                {
                  label: "Status",
                  name: "status",
                  type: "select",
                  items: [
                    { label: "Pendente", value: "PENDENTE" },
                    { label: "Em Análise", value: "EM ANALISE" },
                    { label: "Resolvida", value: "RESOLVIDA" },
                    { label: "Recusada", value: "RECUSADA" },
                    { label: "Reanálise", value: "REANALISE" },
                  ],
                  placeholder: "Pendente",
                  defaultValue: report.info.status,
                  required: true,
                },
                {
                  label: "Nota",
                  name: "adminNote",
                  type: "text",
                  defaultValue: report.info.adminNote,
                },
                {
                  label: "Suspender Vaga?",
                  name: "suspendSpot",
                  type: "select",
                  defaultValue: "false",
                  items: [
                    { value: "true", label: "Sim" },
                    { value: "false", label: "Não" },
                  ],
                },
              ]}
              // onReanalise={() => {}}
              onEdit={async (formData) => {
                // TODO: wire to update report action (approve/reject)
                const res = await APIService.genericEditRequest(
                  BrowserService.getToken(),
                  `admin/reports/${report.id}/status`,
                  -1,
                  formData,
                  "json",
                  false,
                  "PATCH",
                );

                if (res) {
                  refreshReports();
                }
                console.log(
                  "edit report",
                  report.id,
                  Object.fromEntries(formData),
                );
              }}
              // deleteTitle="Excluir denúncia"
              // deleteDescription={`Deseja excluir a denúncia #${report.id.toString().padStart(2, "0")}?`}
              // onDelete={() => {
              //   // TODO: wire to delete report action
              //   console.log("delete report", report.id);
              // }}
              onSuspendSpot={
                report.target.type === "SPOT" && ["RESOLVIDA", "APROVADA"].includes(report.info.status)
                  ? async () => {
                      const res = await APIService.request(
                        `admin/spots/${report.target.id}/suspend`,
                        BrowserService.getToken(),
                        { method: "PATCH" }
                      );
                      if (res.ok) alert("Vaga suspensa com sucesso!");
                      else alert("Erro ao suspender vaga.");
                    }
                  : undefined
              }
            >
              <DefaultEntityFrame
                title={`Denúncia #${report.id.toString().padStart(2, "0")}`}
                description={`Motivo: ${report.info.reason}`}
                tagList={[
                  `Status: ${statusLabel[report.info.status]}`,
                  `Tipo: ${{ SPOT: "Vaga", CHAT: "Conversa" }[report.target.type]}`,
                  // `Denunciante: ${report?.reporter?.person?.name}`,
                  // `Alvo: ${report.reported.person.name}`,
                  `Data: ${report.date.created.toLocaleDateString("pt-BR")}`,
                  `Nota: ${report.info.adminNote ?? "[Não Criada]"}`,
                  // `Nota: ${report}`,
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
