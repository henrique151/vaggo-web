"use client";
import { useState } from "react";
import Tab from "@/classes/TabContainer/Tab";
import TabPage from "@/component/container/TabContainer/TabPage";
import EntityFrame from "@/component/container/EntityContainer/EntityFrame";
import DefaultEntityFrame from "@/component/frames/DefaultEntityFrame";
import { usePageContext } from "../page.context";
import { ReportController } from "@controllers";
import { BrowserService } from "@services";
import FilterBar, { FilterField, FilterValues } from "@/component/filter/FilterBar";

const FILTER_FIELDS: FilterField[] = [
  { key: "reason", label: "Motivo", type: "text", placeholder: "Palavra-chave" },
  {
    key: "status", label: "Status", type: "select",
    options: [
      { value: "PENDENTE",   label: "Pendente" },
      { value: "EM ANALISE", label: "Em Análise" },
      { value: "RESOLVIDA",  label: "Resolvida" },
      { value: "RECUSADA",   label: "Recusada" },
      { value: "REANALISE",  label: "Reanálise" },
    ],
  },
  {
    key: "targetType", label: "Tipo", type: "select",
    options: [{ value: "SPOT", label: "Vaga" }, { value: "CHAT", label: "Conversa" }],
  },
];

const Page = () => {
  const { reports } = usePageContext();
  const [displayReports, setDisplayReports] = useState<typeof reports | undefined>(undefined);

  const filtered = displayReports ?? reports ?? [];

  function handleSearch(values: FilterValues) {
    if (!reports) return;
    const { reason, status, targetType } = values;
    const hasFilter = reason || status || targetType;
    if (!hasFilter) { setDisplayReports(undefined); return; }

    setDisplayReports(
      reports.filter((r) => {
        const rawStatus  = r?.info?.status  ?? r?.status     ?? "";
        const rawReason  = r?.info?.reason  ?? r?.reason     ?? "";
        const rawType    = r?.target?.type  ?? r?.targetType ?? "";
        if (reason     && !rawReason.toLowerCase().includes(reason.toLowerCase())) return false;
        if (status     && rawStatus !== status)                                     return false;
        if (targetType && rawType   !== targetType)                                 return false;
        return true;
      }),
    );
  }

  return (
    <TabPage label="Denúncias">
      <div className="flex items-center justify-between mb-6 bg-base">
        <h2 className="text-2xl font-semibold">Minhas Denúncias</h2>
      </div>

      <FilterBar
        title="Filtrar Denúncias"
        fields={FILTER_FIELDS}
        onSearch={handleSearch}
        onClear={() => setDisplayReports(undefined)}
      />

      <div className="space-y-4">
        {filtered.length > 0 ? (
          filtered.map((report) => {
            const rawStatus     = report?.info?.status ?? report?.status ?? "";
            const statusLabel   = rawStatus.charAt(0).toUpperCase() + rawStatus.slice(1).toLowerCase();
            const reason        = report?.info?.reason  ?? report?.reason     ?? "—";
            const targetType: "SPOT" | "CHAT" = report?.target?.type ?? report?.targetType ?? "SPOT";
            const createdAt     = report?.date?.created ?? report?.createdAt;
            const spotName      = report?.spot?.property?.info?.name ?? report?.spot?.info?.identifier ?? "—";
            const spotIdentifier= report?.spot?.info?.identifier ?? "—";

            return (
              <EntityFrame
                key={report.id}
                onReanalise={async () => {
                  const res = await ReportController.requestReanalysis(BrowserService.getToken(), report.id);
                  alert(res ? "Reanálise solicitada com sucesso!" : "Erro ao solicitar reanálise.");
                }}
              >
                <DefaultEntityFrame
                  title={`Denúncia #${report.id.toString().padStart(2, "0")}`}
                  description={`Motivo: ${reason}`}
                  tagList={[
                    `Status: ${statusLabel}`,
                    `Tipo: ${{ SPOT: "Vaga", CHAT: "Conversa" }[targetType]}`,
                    `Registrado em: ${createdAt ? createdAt.toLocaleDateString("pt-BR") : "—"}`,
                    `Relacionado: ${spotName}${spotIdentifier !== spotName ? ` - ${spotIdentifier}` : ""}`,
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

const ReportsTab = new Tab({ default: "Denúncias", page: "Minhas Denúncias" }, Page);
export default ReportsTab;
