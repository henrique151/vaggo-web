import TabSidebarContainer from "@/component/container/TabContainer/TabSidebarContainer/TabSidebarContainer";
import TabPageContainer from "@/component/container/TabContainer/TabPageContainer";
import Tab from "@/classes/TabContainer/Tab";
import { useEffect, useState } from "react";

export default function useTabController({
  tabSidebarContainer,
  tabPageContainer,
  tabs,
}: {
  tabSidebarContainer?: typeof TabSidebarContainer;
  tabPageContainer?: typeof TabPageContainer;
  tabs: Tab[];
}): [Tab, CallableFunction] {
  const [activeTab, setActiveTab] = useState<Tab>(tabs[0]);

  return [activeTab, setActiveTab];
}
