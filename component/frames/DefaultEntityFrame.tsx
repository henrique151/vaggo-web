import TagContainer from "../container/TagContainer";

type DefaultEntityFrameProps = {
  title: string;
  description: string;
  tagList?: string[];
};
export default function DefaultEntityFrame({
  title,
  description,
  tagList,
}: DefaultEntityFrameProps) {
  return (
    // TODO add EntityFrame as parent, change EntityFrame to GenericEntityFrame
    <>
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>

      <p className="text-sm text-gray-500 mt-1">{description}</p>

      {tagList ? (
        <div className="flex gap-2 mt-3 flex-wrap">
          {tagList?.map((tag) => {
            return <TagContainer key={tag}>{tag}</TagContainer>;
          })}
        </div>
      ) : null}
    </>
  );
}
