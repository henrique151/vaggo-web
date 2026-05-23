import PanelLayout from "../layout/PanelLayout";

export default function PanelContainer({ title, children }: any) {
  return (
    <PanelLayout className="p-8">
      {/*<section className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8">*/}
      {/*<section className="">*/}
      <h2 className="text-2xl font-semibold mb-6">{title}</h2>

      <div className="text-gray-500">{children}</div>
      {/*</section>*/}
    </PanelLayout>
  );
}

// <section className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8">
//   <h2 className="text-2xl font-semibold mb-6">
//     Próximas reservas
//   </h2>

//   <div className="text-gray-500">
//     Nenhuma reserva agendada.
//   </div>
// </section>
