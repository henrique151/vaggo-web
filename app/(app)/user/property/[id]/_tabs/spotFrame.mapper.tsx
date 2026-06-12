import { Spot } from "@classes";
import EntityFrame from "@/component/container/EntityContainer/EntityFrame";
import DefaultEntityFrame from "@/component/frames/DefaultEntityFrame";

export default function map(d: Spot) {
  return (
    <EntityFrame>
      <DefaultEntityFrame
        title={d.info?.identifier || "Vaga"}
        description={`Tamanho: ${d.info.size || 0}`}
        tagList={[
          `Status: ${d.status.approval || "DESCONHECIDO"}`,
          `Preço: R$${d.info?.price || "00.00"}`,
          `Coberta? ${d.status.covered ? "Sim" : "Não"}`,
        ]}
      />
    </EntityFrame>
  );
}
