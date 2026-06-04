export default function FormContainer({
  children,
  onSubmit,
  className,
  action,
}: {
  onSubmit?;
  children: React.ReactNode;
  className?: string;
  action?;
}) {
  return (
    <form className={`${className || ""}`} onSubmit={onSubmit} action={action}>
      {children}
    </form>
  );
}
