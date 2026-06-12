import Tab from "@/classes/TabContainer/Tab";
import TabPage from "@/component/container/TabContainer/TabPage";
import EntityFrame from "@/component/container/EntityContainer/EntityFrame";
import DefaultEntityFrame from "@/component/frames/DefaultEntityFrame";

// TODO: substituir pelo tipo real de Review e pelo hook de dados
type AdminReview = {
  id: number;
  rating: number;
  comment?: string;
  authorName: string;
  targetName: string;
  targetType: "SPOT" | "USER";
  createdAt: Date;
};

const Page = () => {
  // TODO: const { reviews } = useAdminContext();
  const reviews: AdminReview[] = []; // placeholder

  return (
    <TabPage label="Avaliações">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Avaliações</h2>
      </div>

      <div className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <EntityFrame
              key={review.id}
              editTitle={`Editar Avaliação #${review.id.toString().padStart(2, "0")}`}
              editFields={[
                {
                  label: "Nota", name: "rating", type: "select",
                  defaultValue: String(review.rating),
                  items: [
                    { value: "1", label: "1 — Péssimo" },
                    { value: "2", label: "2 — Ruim" },
                    { value: "3", label: "3 — Regular" },
                    { value: "4", label: "4 — Bom" },
                    { value: "5", label: "5 — Excelente" },
                  ],
                  required: true,
                },
                { label: "Comentário", name: "comment", type: "text", placeholder: "Comentário da avaliação", defaultValue: review.comment },
              ]}
              onEdit={(formData) => {
                // TODO: wire to update review action
                console.log("edit review", review.id, Object.fromEntries(formData));
              }}
              deleteTitle="Excluir avaliação"
              deleteDescription={`Deseja excluir a avaliação de ${review.authorName} sobre ${review.targetName}?`}
              onDelete={() => {
                // TODO: wire to delete review action
                console.log("delete review", review.id);
              }}
            >
              <DefaultEntityFrame
                title={`${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)} — ${review.authorName}`}
                description={review.comment || "Sem comentário"}
                tagList={[
                  `Alvo: ${review.targetName}`,
                  `Tipo: ${{ SPOT: "Vaga", USER: "Usuário" }[review.targetType]}`,
                  `Data: ${review.createdAt.toLocaleDateString("pt-BR")}`,
                ]}
              />
            </EntityFrame>
          ))
        ) : (
          <p className="text-muted">Nenhuma avaliação encontrada.</p>
        )}
      </div>
    </TabPage>
  );
};

const ReviewsTab = new Tab({ default: "Avaliações", page: "Avaliações" }, Page);

export default ReviewsTab;
