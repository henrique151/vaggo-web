"use client";

import PageContextProvider from "./page.provider";
import PageComponent from "./page.component";

export default function Page() {
  return (
    <PageContextProvider>
      <PageComponent />
    </PageContextProvider>
  );
}
