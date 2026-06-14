import Tab from "@/classes/TabContainer/Tab";
import TabPage from "@/component/container/TabContainer/TabPage";
import EntityFrame from "@/component/container/EntityContainer/EntityFrame";
import DefaultEntityFrame from "@/component/frames/DefaultEntityFrame";
import { usePageContext } from "../page.context";
import { ReportController } from "@controllers";
import { BrowserService } from "@services";

const Page = () => {
  // BUG FIX: renomeado de "reports" para contexto correto do usuário
  const { reports } = usePageContext();

  return (
    <TabPage label="Denúncias">
      <div className="flex items-center justify-between mb-6 bg-base">
        <h2 className="text-2xl font-semibold">Minhas Denúncias</h2>
      </div>

      <div className="space-y-4">
        {reports?.length > 0 ? (
          reports.map((report) => {
            // BUG FIX: capitalização segura do status
            const rawStatus = report?.info?.status ?? report?.status ?? "";
            const statusLabel =
              rawStatus.charAt(0).toUpperCase() +
              rawStatus.slice(1).toLowerCase();

            // BUG FIX: acessa campos de forma segura, compatível com ReportData
            const reason = report?.info?.reason ?? report?.reason ?? "—";
            const targetType: "SPOT" | "CHAT" =
              report?.target?.type ?? report?.targetType ?? "SPOT";
            const createdAt: Date | undefined =
              report?.date?.created ?? report?.createdAt;
            const spotName =
              report?.spot?.property?.info?.name ??
              report?.spot?.info?.identifier ??
              "—";
            const spotIdentifier = report?.spot?.info?.identifier ?? "—";

            return (
              <EntityFrame
                key={report.id}
                // BUG FIX: onReanalise agora funciona corretamente
                onReanalise={async () => {
                  const res = await ReportController.requestReanalysis(
                    BrowserService.getToken(),
                    report.id,
                  );
                  if (res) {
                    alert("Reanálise solicitada com sucesso!");
                  } else {
                    alert("Erro ao solicitar reanálise.");
                  }
                }}
              >
                <DefaultEntityFrame
                  title={`Denúncia #${report.id.toString().padStart(2, "0")}`}
                  description={`Motivo: ${reason}`}
                  tagList={[
                    `Status: ${statusLabel}`,
                    `Tipo: ${{ SPOT: "Vaga", CHAT: "Conversa" }[targetType]}`,
                    `Registrado em: ${createdAt
                      ? createdAt.toLocaleDateString("pt-BR")
                      : "—"
                    }`,
                    `Relacionado: ${spotName}${spotIdentifier !== spotName ? ` - ${spotIdentifier}` : ""
                    }`,
                  ]}
                />
              </EntityFrame>
            );
          })
        ) : (
          <p>Nenhuma Denúncia registrada no momento.</p>
        )}
      </div>
    </TabPage>
  );
};

const ReportsTab = new Tab(
  { default: "Denúncias", page: "Minhas Denúncias" },
  Page,
);

export default ReportsTab;