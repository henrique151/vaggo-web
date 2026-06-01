import Tab from "@/classes/TabContainer/Tab";
import DefaultTabSidebarFragment from "./DefaultTabSidebarFragment";
import TabSidebarContainer from "../container/TabContainer/TabSidebarContainer/TabSidebarContainer";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function DefaultTabSidebar({
  tabs,
  activeTab,
  activeTabSetter,
}: {
  tabs: Tab[];
  activeTab: Tab;
  activeTabSetter: CallableFunction;
}) {
  const [tabSidebarComponents, setTabSidebarComponents] = useState<
    React.ReactNode[]
  >([]);

  // useEffect(() => {
  //   // console.log("tabSidebarComponents");
  //   // console.log(tabSidebarComponents);
  //   console.log(activeTab);
  //   console.log("activeTab");
  // }, [activeTab]);
  return (
    <TabSidebarContainer
      TabFragment={DefaultTabSidebarFragment}
      tabs={tabs}
      activeTab={activeTab}
      activeTabSetter={activeTabSetter}
      TabSidebarComponentSetter={setTabSidebarComponents}
    >
      <aside
        className="
      bg-card
      border border-base
      rounded-3xl
      shadow-sm
      p-4
      h-fit
    "
      >
        <div className="space-y-2">{tabSidebarComponents}</div>
      </aside>
    </TabSidebarContainer>
  );
}
