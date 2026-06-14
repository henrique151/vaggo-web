import Tab from "@/classes/TabContainer/Tab";
import TabPage from "@/component/container/TabContainer/TabPage";
import EntityFrame from "@/component/container/EntityContainer/EntityFrame";
import DefaultEntityFrame from "@/component/frames/DefaultEntityFrame";
import useGetReviews from "@/modules/review/hooks/useGetReviews";

const Page = () => {
  const [reviews] = useGetReviews();

  return (
    <TabPage label="Avaliações">
      <div className="flex items-center justify-between mb-6 bg-base">
        <h2 className="text-2xl font-semibold">Minhas Avaliações</h2>
      </div>

      <div className="space-y-4">
        {reviews?.length > 0 ? reviews.map((review) => {
          return (
            <EntityFrame
              key={review.id}
            >
              <DefaultEntityFrame
                title={`Avaliação #${review.id}`}
                description={`Comentário: ${review.info.comment}`}
                tagList={[
                  `Nota: ${review.info.rating}/5`,
                ]}
              />
            </EntityFrame>
          );
        }) : <p>Nenhuma Avaliação registrada no momento.</p>}
      </div>
    </TabPage>
  );
};

const ReviewsTab = new Tab(
  { default: "Avaliações", page: "Minhas Avaliações" },
  Page,
);

export default ReviewsTab;
