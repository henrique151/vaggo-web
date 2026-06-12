import { Spot } from "@classes";
import EntityFrame from "@/component/container/EntityContainer/EntityFrame";
import DefaultEntityFrame from "@/component/frames/DefaultEntityFrame";

export default function map(d: Spot) {
  return (
    <EntityFrame
      editTitle={`Vaga ${d.identifier}`}
      editFields={[
        {
          label: "Identificador",
          name: "identifier",
          type: "text",
          placeholder: "Identificador da vaga",
          defaultValue: d.identifier,
          required: true,
        },
        {
          label: "Preço",
          name: "price",
          type: "text",
          placeholder: "Preço",
          defaultValue: d.price,
          required: true,
        },
        {
          label: "Coberta?",
          name: "isCovered",
          type: "select",
          defaultValue: d.isCovered ? "true" : "false",
          items: [
            { value: "true", label: "Sim" },
            { value: "false", label: "Não" },
          ],
        },
      ]}
      onEdit={(formData) => {
        // TODO: wire to update spot action
        console.log("edit spot", d.id, Object.fromEntries(formData));
      }}
      deleteTitle="Excluir vaga"
      deleteDescription={`Deseja excluir a vaga ${d.identifier}?`}
      onDelete={() => {
        // TODO: wire to delete spot action
        console.log("delete spot", d.id);
      }}
    >
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
