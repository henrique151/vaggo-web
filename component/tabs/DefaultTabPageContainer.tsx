import Tab from "@/classes/TabContainer/Tab";
import TabPageContainer from "../container/TabContainer/TabPageContainer";

export default function DefaultTabPageContainer({
  activeTab,
}: {
  activeTab: Tab | undefined;
}) {
  return (
    <section className="lg:col-span-3">
      <div
        className="
        bg-base
        border border-base
        rounded-3xl
        shadow-sm
        p-8
        min-h-[500px]
      "
      >
        <TabPageContainer activeTab={activeTab} />
      </div>
    </section>
  );
}
