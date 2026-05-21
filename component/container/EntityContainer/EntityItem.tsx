export default function EntityItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="border border-gray-200 rounded-2xl p-4 bg-white">
      <p className="text-sm text-gray-500 mb-1">{label}</p>

      <p className="font-medium text-gray-900">{value}</p>
    </div>
  );
}
