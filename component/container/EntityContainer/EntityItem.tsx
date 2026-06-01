export default function EntityItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="border border-soft rounded-2xl p-4 bg-base">
      <p className="text-sm text-base mb-1">{label}</p>

      <p className="font-medium text-muted">{value}</p>
    </div>
  );
}
