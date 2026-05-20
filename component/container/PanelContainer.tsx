export default function PanelContainer({ title, children }: any) {
  return (
    <section className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8">
      <h2 className="text-2xl font-semibold mb-6">{title}</h2>

      <div className="text-gray-500">{children}</div>
    </section>
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
