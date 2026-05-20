export default function TagContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span
      className="
        px-3 py-1
        rounded-full
        text-xs
        bg-gray-100
        text-gray-700
      "
    >
      {children}
    </span>
  );
}
