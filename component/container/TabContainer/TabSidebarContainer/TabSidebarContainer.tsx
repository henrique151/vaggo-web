/* eslint-disable react/jsx-key */
import { createContext, useContext, useEffect, useState } from "react";

import TabSidebarFragment from "./TabSidebarFragment";
import Tab from "@/classes/TabContainer/Tab";

// type TabSidebarContextType = {
//   tabComponents: (typeof TabSidebarFragment)[];
// };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const TabSidebarContainerContext = createContext<any | undefined>(
  undefined,
);

// export function TabSidebarContainerProvider({children}: {children: Element}) {
//   const [tabs, setTabs] = useState([])
// }

export default function TabSidebarContainer({
  TabFragment,
  tabs,
  activeTab,
  activeTabSetter,
  TabSidebarComponentSetter,
  children,
}: {
  // TabFragment: React.ReactNode;
  // TODO error: JSX element type 'TabFragment' does not have any construct or call signatures.
  TabFragment: any;
  tabs: Tab[];
  activeTab: Tab;
  activeTabSetter: CallableFunction;
  TabSidebarComponentSetter: CallableFunction;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (tabs) {
      TabSidebarComponentSetter(
        tabs.map((tab, index) => {
          return (
            <TabFragment
              key={index}
              label={"asd"}
              activeTab={activeTab}
              activeTabSetter={activeTabSetter}
              tab={tab}
            />
          );
        }),
      );
      // console.log(tabs);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  // this component will:
  //  variables:
  //    component to store tab buttons to switch between tabs
  return <>{children}</>;
}

// const useTabSidebarContainer = () => useContext(TabSidebarContainerContext);
