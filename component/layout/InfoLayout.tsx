export default function InfoLayout({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/*<Header />*/}

      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-semibold text-gray-900">{title}</h1>

          <p className="text-gray-500 mt-2">{description}</p>
        </div>

        <div className="border-b-gray-200 border-b-2" />
        <div className="h-5" />

        {children}
        {/*<div className="grid grid-cols-1 lg:grid-cols-4 gap-8"></div>*/}
      </section>
    </main>
  );
}
