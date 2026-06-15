"use client";
import { useState } from "react";
import Tab from "@/classes/TabContainer/Tab";
import TabPage from "@/component/container/TabContainer/TabPage";
import EntityFrame from "@/component/container/EntityContainer/EntityFrame";
import DefaultEntityFrame from "@/component/frames/DefaultEntityFrame";
import useGetReviews from "@/modules/review/hooks/useGetReviews";
import FilterBar, { FilterField, FilterValues } from "@/component/filter/FilterBar";

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
  const [reviews] = useGetReviews();
  const [displayReviews, setDisplayReviews] = useState<typeof reviews | undefined>(undefined);

  const filtered = displayReviews ?? reviews ?? [];

  function handleSearch(values: FilterValues) {
    if (!reviews) return;
    const { comment, rating } = values;
    const hasFilter = comment || rating;
    if (!hasFilter) { setDisplayReviews(undefined); return; }

    setDisplayReviews(
      reviews.filter((r) => {
        if (comment && !r.info.comment?.toLowerCase().includes(comment.toLowerCase())) return false;
        if (rating  && r.info.rating < Number(rating))                                 return false;
        return true;
      }),
    );
  }

  return (
    <TabPage label="Avaliações">
      <div className="flex items-center justify-between mb-6 bg-base">
        <h2 className="text-2xl font-semibold">Minhas Avaliações</h2>
      </div>

      <FilterBar
        title="Filtrar Avaliações"
        fields={FILTER_FIELDS}
        onSearch={handleSearch}
        onClear={() => setDisplayReviews(undefined)}
      />

      <div className="space-y-4">
        {filtered.length > 0 ? (
          filtered.map((review) => (
            <EntityFrame key={review.id}>
              <DefaultEntityFrame
                title={`Avaliação #${review.id}`}
                description={`Comentário: ${review.info.comment}`}
                tagList={[`Nota: ${review.info.rating}/5`]}
              />
            </EntityFrame>
          ))
        ) : (
          <p>Nenhuma Avaliação registrada no momento.</p>
        )}
      </div>
    </TabPage>
  );
};

const ReviewsTab = new Tab({ default: "Avaliações", page: "Minhas Avaliações" }, Page);
export default ReviewsTab;
