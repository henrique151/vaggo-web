// component/tabSidebar.tsx
'use client'

export default function TabSidebar({
  subPages,
  activeTab,
  setActiveTab,
}: any) {
  const tabs = Object.keys(subPages)

  return (
    <aside
      className="
        bg-white
        border border-gray-200
        rounded-3xl
        shadow-sm
        p-4
        h-fit
      "
    >
      <div className="space-y-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`
              w-full text-left px-4 py-3 rounded-2xl transition
              ${
                activeTab === tab
                  ? "bg-gray-900 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }
            `}
          >
            {tab}
          </button>
        ))}
      </div>
    </aside>
  )
}
