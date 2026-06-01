import { HTMLAttributes } from "react";

export default function PanelLayout({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`bg-card rounded-3xl border border-soft shadow-sm ${className || ""}`}
    >
      {children}
    </section>
  );
}
