import { Spot } from "@/classes/spot";
import EntityFrame from "@/component/container/EntityContainer/EntityFrame";
import DefaultEntityFrame from "@/component/frames/DefaultEntityFrame";

export default function map(d: Spot) {
  return (
    <EntityFrame>
      <DefaultEntityFrame
        title={d.identifier}
        description={d.price}
        tagList={[
          `Status: ${d.approvalStatus}`,
          `Preço: ${d.price}`,
          `Coberta? ${d.isCovered}`,
        ]}
      />
    </EntityFrame>
  );
}
