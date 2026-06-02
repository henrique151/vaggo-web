import Link from "next/link";
import TagContainer from "../container/TagContainer";

type DefaultEntityFrameProps = {
  title: string;
  description: string;
  tagList?: string[];
  redirectTo?: string;
};
export default function DefaultEntityFrame({
  title,
  description,
  tagList,
  redirectTo,
}: DefaultEntityFrameProps) {
  return (
    // TODO add EntityFrame as parent, change EntityFrame to GenericEntityFrame
    <>
      {redirectTo ? (
        <Link className="text-lg font-semibold text-primary" href={redirectTo}>
          {title}
        </Link>
      ) : (
        <h3 className="text-lg font-semibold text-primary">{title}</h3>
      )}
      <p className="text-sm text-subtle mt-1">{description}</p>

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
