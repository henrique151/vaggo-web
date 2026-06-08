export default function FormContainer({
  children,
  onSubmit,
  className,
  action,
  errorMessage,
}: {
  onSubmit?;
  children: React.ReactNode;
  className?: string;
  action?;
  errorMessage?: string;
}) {
  return (
    <form className={`${className || ""}`} onSubmit={onSubmit} action={action}>
      {children}
      {/* TODO make a native submit button to FormContainer and modularize it */}
      <p className="text-rose-400">{errorMessage}</p>
    </form>
  );
}
