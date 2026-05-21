// component/tabContainer.tsx
export default function TabContainer({
  subPages,
  activeTab,
}: any) {
  return (
    <section className="lg:col-span-3">
      <div
        className="
          bg-white
          border border-gray-200
          rounded-3xl
          shadow-sm
          p-8
          min-h-[500px]
        "
      >
        {subPages[activeTab]}
      </div>
    </section>
  )
}
