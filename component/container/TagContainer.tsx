export default function TagContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`
        px-3 py-1
        rounded-full
        text-xs
        surface-elevated
        text-muted
        ${className}
          `}
    >
      {children}
    </span>
  );
}
