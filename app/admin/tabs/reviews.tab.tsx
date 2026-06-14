import { useState } from "react";
import Tab from "@/classes/TabContainer/Tab";
import TabPage from "@/component/container/TabContainer/TabPage";
import EntityFrame from "@/component/container/EntityContainer/EntityFrame";
import DefaultEntityFrame from "@/component/frames/DefaultEntityFrame";
import { usePageContext } from "../_context/page.context";
import { Review } from "@classes";
import { APIService, BrowserService } from "@services";
import FilterBar, { FilterField, FilterValues } from "@/component/filter/FilterBar";

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

const FILTER_FIELDS: FilterField[] = [
  { key: "comment", label: "Comentário", type: "text", placeholder: "Palavra-chave" },
  {
    key: "rating", label: "Nota mínima", type: "select",
    options: [
      { value: "1", label: "★ 1+" },
      { value: "2", label: "★★ 2+" },
      { value: "3", label: "★★★ 3+" },
      { value: "4", label: "★★★★ 4+" },
      { value: "5", label: "★★★★★ 5" },
    ],
  },
];

const Page = () => {
  const { reviews, refreshReviews } = usePageContext();
  const [displayReviews, setDisplayReviews] = useState<Review[] | undefined>(undefined);
  console.log(reviews);
  // const reviews: AdminReview[] = []; // placeholder

  const filtered = displayReviews ?? reviews;

  const handleSearch = (values: FilterValues) => {
    const { comment, rating } = values;
    const hasFilter = comment || rating;
    if (!hasFilter) { setDisplayReviews(undefined); return; }

    setDisplayReviews(
      (reviews ?? []).filter((r: Review) => {
        if (comment && !r.info.comment?.toLowerCase().includes(comment.toLowerCase())) return false;
        if (rating  && r.info.rating < Number(rating))                                 return false;
        return true;
      }),
    );
  };

  return (
    <TabPage label="Avaliações">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Avaliações</h2>
      </div>

      <FilterBar
        title="Filtrar Avaliações"
        fields={FILTER_FIELDS}
        onSearch={handleSearch}
        onClear={() => setDisplayReviews(undefined)}
      />

      <div className="space-y-4">
        {filtered?.length > 0 ? (
          filtered?.map((review: Review) => (
            <EntityFrame
              key={review.id}
              // editTitle={`Editar Avaliação #${review.id.toString().padStart(2, "0")}`}
              // editFields={[
              //   {
              //     label: "Nota",
              //     name: "rating",
              //     type: "select",
              //     defaultValue: String(review.info.rating),
              //     items: [
              //       { value: "1", label: "1 — Péssimo" },
              //       { value: "2", label: "2 — Ruim" },
              //       { value: "3", label: "3 — Regular" },
              //       { value: "4", label: "4 — Bom" },
              //       { value: "5", label: "5 — Excelente" },
              //     ],
              //     required: true,
              //   },
              //   {
              //     label: "Comentário",
              //     name: "comment",
              //     type: "text",
              //     placeholder: "Comentário da avaliação",
              //     defaultValue: review.info.comment,
              //   },
              // ]}
              // onEdit={(formData) => {
              //   // TODO: wire to update review action
              //   console.log(
              //     "edit review",
              //     review.id,
              //     Object.fromEntries(formData),
              //   );
              // }}
              deleteTitle="Excluir avaliação"
              deleteDescription={`Deseja excluir a avaliação de ${review?.info?.author?.email} sobre ${review.spot.info.identifier}?`}
              onDelete={async () => {
                const res = await APIService.genericDeleteRequest(
                  BrowserService.getToken(),
                  "admin/reviews",
                  review.id,
                );

                if (res) {
                  refreshReviews();
                }
                // TODO: wire to delete review action
                console.log("delete review", review.id);
              }}
            >
              <DefaultEntityFrame
                title={`${"★".repeat(review.info.rating)}${"☆".repeat(5 - review.info.rating)} — ${review?.info?.author?.email}`}
                description={review.info.comment || "Sem comentário"}
                tagList={[
                  `Alvo: ${review.spot?.info?.identifier ?? ""}`,
                  `Tipo: ${{ SPOT: "Vaga", USER: "Usuário" }[review.spot ? "SPOT" : "USER"]}`,
                  `Data: ${review.date.review.toLocaleDateString("pt-BR")}`,
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