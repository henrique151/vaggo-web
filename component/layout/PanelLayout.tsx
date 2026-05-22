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
      className={`bg-white rounded-3xl border border-gray-200 shadow-sm ${className || ""}`}
    >
      {children}
    </section>
  );
}
