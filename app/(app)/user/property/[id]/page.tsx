"use client";

import PageContextProvider from "./_context/page.provider";
import PageComponent from "./page.component";

// TODO convert to layout.tsx
export default function Page() {
  return (
    <PageContextProvider>
      <PageComponent />
    </PageContextProvider>
  );
}
