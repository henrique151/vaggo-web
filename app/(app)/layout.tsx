import Header from "@/component/header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Header showSearch />
      {children}
    </main>
  );
}
