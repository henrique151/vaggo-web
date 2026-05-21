// component/tabPage.tsx
export default function TabPage({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return <section>{children}</section>;
}
