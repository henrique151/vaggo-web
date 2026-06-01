import Tab from "@/classes/TabContainer/Tab";
import { useEffect } from "react";

export default function DefaultTabSidebarFragment({
  activeTab,
  activeTabSetter,
  tab,
}: {
  activeTab: Tab;
  activeTabSetter: CallableFunction;
  tab: Tab;
}) {
  // useEffect(() => {
  //   console.log("activeTab");
  //   console.log(activeTab);
  // });

  return (
    <button
      onClick={() => activeTabSetter(tab)}
      className={`
    w-full text-left px-4 py-3 rounded-2xl transition
    ${activeTab === tab
          ? "tab-item-active"
          : "tab-item-hover"
        }
  `}
    >
      {tab.getLabel("sidebar")}
    </button>
  );
}

// ${
//   activeTab === tab
//     ? "bg-gray-900 text-white"
//     : "text-gray-700 hover:bg-gray-100"
// }
