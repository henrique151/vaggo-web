"use client";

import Header from "@/component/header";
import { useState } from "react";
import PageContextProvider from "./page.provider";

import pageTabs from "./page.tabs";
import useTabController from "@/hooks/useTabController";
import DefaultTabSidebar from "@/component/tabs/DefaultTabSidebar";
import DefaultTabPageContainer from "@/component/tabs/DefaultTabPageContainer";

export default function PageComponent() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useTabController({ tabs: pageTabs });

  return (
    <PageContextProvider>
      <main className="min-h-screen">
        <section className="max-w-7xl mx-auto px-6 py-8">
          <div className="surface-elevated rounded-4xl p-8">
            <div className="mb-8">
              <h1 className="text-4xl font-semibold text-primary">
                Minha Conta
              </h1>

              <p className="text-muted mt-2">
                Gerencie suas informações e preferências
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <DefaultTabSidebar
                tabs={pageTabs}
                activeTab={activeTab}
                activeTabSetter={setActiveTab}
              />

              <DefaultTabPageContainer activeTab={activeTab} />
            </div>
          </div>
        </section>

        {/* EDIT DO MODAL */}
        {isEditing && (
          <div
            className="
          fixed inset-0
          z-50
          flex items-center justify-center
          bg-black/30
          backdrop-blur-sm
        "
            onClick={() => setIsEditing(false)}
          >
            <div onClick={(e) => e.stopPropagation()}></div>
          </div>
        )}
      </main>
    </PageContextProvider>
  );
}
