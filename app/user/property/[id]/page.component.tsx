// import FormContainer from "@/component/container/FormContainer";
import { Image } from "@/classes/data/Image";
import InfoLayout from "@/component/layout/InfoLayout";
// import FormItem from "@/component/ui/form/FormItem";
import { useGetPropertyById } from "@/hooks/api/property/useGetPropertyById";
import { usePageContext } from "./_context/page.context";
import DefaultTabPageContainer from "@/component/tabs/DefaultTabPageContainer";
import DefaultTabSidebar from "@/component/tabs/DefaultTabSidebar";
import pageTabs from "./_tabs/page.tabs";
import useTabController from "@/hooks/useTabController";

export default function Page() {
  const { property } = usePageContext();
  const [activeTab, setActiveTab] = useTabController({ tabs: pageTabs });
  return (
    <InfoLayout
      title={`${property?.name || "Propriedade [XXX]"}`}
      description={`${property?.description || "Descrição"}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <DefaultTabSidebar
          tabs={pageTabs}
          activeTab={activeTab}
          activeTabSetter={setActiveTab}
        />

        <DefaultTabPageContainer activeTab={activeTab} />
      </div>
    </InfoLayout>
  );
}
