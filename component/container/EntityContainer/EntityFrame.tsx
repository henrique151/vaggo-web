interface EntityFrameProps {
  children: React.ReactNode;
  editForm?: React.ReactNode;
  // data: never;
}

export default function EntityFrame({
  children,
  // data,
}: EntityFrameProps) {
  return (
    <section className="surface-elevated rounded-2xl p-5 shadow-sm hover:shadow-md transition">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">{children}</div>
      </div>
    </section>
  );
}
