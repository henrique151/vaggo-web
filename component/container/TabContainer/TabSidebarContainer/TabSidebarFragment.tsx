import Tab from "@/classes/TabContainer/Tab";
import { JSX, useState } from "react";

export default function TabSidebarFragment({
  label,
  activeTab,
  activeTabSetter,
  tab,
}: {
  label: string;
  activeTab?: Tab;
  activeTabSetter: CallableFunction;
  tab: Tab;
}) {
  return <></>;
  // const [isActive, setIsActive] = useState(false);
}
