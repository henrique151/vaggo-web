export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/*<Header />*/}

      <section className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-6xl text-zinc-800">Alameda dos Erros, 429</h1>
        <p className="text-2xl text-zinc-800">
          Seu acesso foi bloqueado temporariamente por medidas de segurança
          devido a quantidade de requisições excessivas vindas de seu
          dispositivo. Seu acesso retornará novamente em 1 hora.
        </p>
        <p className="text-1xl text-zinc-800">
          Pedimos desculpas pelo transtorno.
        </p>
      </section>
    </main>
  );
}
