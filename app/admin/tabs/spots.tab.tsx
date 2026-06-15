"use client";

import { useState, useEffect } from "react";
import Tab from "@/classes/TabContainer/Tab";
import TabPage from "@/component/container/TabContainer/TabPage";
import EntityFrame from "@/component/container/EntityContainer/EntityFrame";
import DefaultEntityFrame from "@/component/frames/DefaultEntityFrame";
import { usePageContext } from "../_context/page.context";
import { SpotAdminController } from "@controllers";
import { BrowserService } from "@services";
import FilterBar, { FilterField, FilterValues } from "@/component/filter/FilterBar";

// The raw API shape for a spot (admin endpoint)
type RawSpot = {
  id: number;
  identifier?: string;
  prefix?: string;
  isCovered?: boolean;
  size?: string;
  price?: string | number;
  approvalStatus?: string;
  status?: string;
  isActive?: boolean;
  rejectionReason?: string;
  property?: {
    id?: number;
    name?: string;
    info?: { name?: string };
  };
  [key: string]: any;
};

const FILTER_FIELDS: FilterField[] = [
  { key: "id",    label: "ID",                     type: "text",  placeholder: "Ex: 10" },
  { key: "email", label: "E-mail do Proprietário", type: "email", placeholder: "email@exemplo.com" },
  {
    key: "status", label: "Status", type: "select",
    options: [
      { value: "PENDENTE", label: "Pendente" },
      { value: "APROVADA", label: "Aprovada" },
      { value: "RECUSADA", label: "Recusada" },
    ],
  },
];

const Page = () => {
  const { adminSpots, refreshAdminSpots } = usePageContext();
  const [displaySpots, setDisplaySpots] = useState<RawSpot[]>([]);

  useEffect(() => {
    if (adminSpots) {
      setDisplaySpots(adminSpots);
    }
  }, [adminSpots]);

  const handleSearch = async (values: FilterValues) => {
    const { id, email, status } = values;
    const hasFilters = id || email || status;
    if (!hasFilters) {
      setDisplaySpots(adminSpots || []);
      return;
    }

    try {
      const token = BrowserService.getToken();
      const results = await SpotAdminController.search(token, { id, email, status });
      setDisplaySpots(results || []);
    } catch (err) {
      console.error("Erro na busca:", err);
    }
  };

  // Helper to get spot identifier
  const getIdentifier = (spot: RawSpot) =>
    spot.identifier || spot.prefix || `#${spot.id}`;

  // Helper to get approval status
  const getApproval = (spot: RawSpot) =>
    spot.approvalStatus || spot.status || "PENDENTE";

  // Helper to get property name
  const getPropertyName = (spot: RawSpot) =>
    spot.property?.info?.name || spot.property?.name || "Desconhecida";

  return (
    <TabPage label="Vagas">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Vagas (Spots)</h2>
      </div>

      <FilterBar
        title="Filtrar Vagas"
        fields={FILTER_FIELDS}
        onSearch={handleSearch}
        onClear={() => setDisplaySpots(adminSpots || [])}
      />

      {/* Lista */}
      <div className="space-y-4">
        {displaySpots && displaySpots.length > 0 ? (
          displaySpots.map((spot: RawSpot) => (
            <EntityFrame
              key={spot.id}
              editTitle={`Avaliar Vaga ${getIdentifier(spot)}`}
              editFields={[
                {
                  label: "Aprovação",
                  name: "status",
                  type: "select",
                  defaultValue: getApproval(spot),
                  items: [
                    { value: "PENDENTE", label: "Pendente" },
                    { value: "APROVADA", label: "Aprovada" },
                    { value: "RECUSADA", label: "Recusada" },
                  ],
                },
                {
                  label: "Motivo da Recusa (obrigatório se Recusada)",
                  name: "rejectionReason",
                  type: "text",
                  placeholder: "Informe o motivo da recusa",
                  defaultValue: spot.rejectionReason || "",
                },
                {
                  label: "Status de Ativação",
                  name: "isActive",
                  type: "select",
                  defaultValue: spot.isActive ? "true" : "false",
                  items: [
                    { value: "true", label: "Ativa" },
                    { value: "false", label: "Desativada" },
                  ],
                },
              ]}
              onEdit={async (formData) => {
                const token = BrowserService.getToken();
                const obj = Object.fromEntries(formData);
                const status = obj.status as string;
                const rejectionReason = obj.rejectionReason as string;
                const isActive = obj.isActive === "true";

                if (status === "RECUSADA" && !rejectionReason?.trim()) {
                  alert("Motivo da recusa é obrigatório quando o status é Recusada.");
                  return;
                }

                const currentApproval = getApproval(spot);
                if (status !== currentApproval) {
                  await SpotAdminController.evaluate(token, spot.id, status, rejectionReason || undefined);
                }

                if (isActive !== spot.isActive) {
                  await SpotAdminController.toggleActive(token, spot.id, isActive);
                }

                refreshAdminSpots();
              }}
              deleteTitle="Excluir Vaga"
              deleteDescription={`Tem certeza que deseja excluir a vaga ${getIdentifier(spot)} (ID: ${spot.id})? Esta ação não pode ser desfeita.`}
              onDelete={async () => {
                const token = BrowserService.getToken();
                const ok = await SpotAdminController.deleteSpot(token, spot.id);
                if (ok) {
                  refreshAdminSpots();
                } else {
                  alert("Não foi possível excluir a vaga. Tente novamente.");
                }
              }}
            >
              <DefaultEntityFrame
                title={`Vaga ${getIdentifier(spot)} (ID: ${spot.id})`}
                description={`Propriedade: ${getPropertyName(spot)}`}
                tagList={[
                  `Tipo: ${spot.isCovered ? "Coberta" : "Descoberta"}`,
                  `Tamanho: ${spot.size || "-"}`,
                  `Aprovação: ${getApproval(spot)}`,
                  `Ativa: ${spot.isActive ? "Sim" : "Não"}`,
                  `Preço: R$ ${spot.price || "0,00"}`,
                ]}
              />
            </EntityFrame>
          ))
        ) : (
          <p className="text-muted text-sm">
            {adminSpots === undefined
              ? "Carregando vagas..."
              : "Nenhuma vaga encontrada."}
          </p>
        )}
      </div>
    </TabPage>
  );
};

const SpotsTab = new Tab({ default: "Vagas", page: "Vagas" }, Page);

export default SpotsTab;