"use client";

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/*<Header />*/}

      <section className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-6xl">429</h1>
        <p className="text-2xl">
          Seu acesso foi bloqueado temporariamente por ter realizado muitas
          requisições ao mesmo tempo. Seu acesso voltará novamente em 1 hora.
        </p>
        <p className="text-1xl">Pedimos desculpas pelo transtorno.</p>
      </section>
    </main>
  );
}
