import Tab from "@/classes/TabContainer/Tab";
// import { useEffect, useState } from "react";

export default function TabPageContainer({
  activeTab,
}: {
  activeTab: Tab | undefined;
}) {
  // useEffect(() => {
  //   console.log("activePageTab");
  //   console.log(activeTab);
  // }, [activeTab]);

  return <>{activeTab ? <activeTab.page /> : null}</>;
}
