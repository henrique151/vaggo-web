import Header from "@/component/header";
import VLibrasPlugin from "../VLibras.component";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Header showSearch />
      {/*<VLibrasPlugin />*/}
      {children}
    </main>
  );
}
