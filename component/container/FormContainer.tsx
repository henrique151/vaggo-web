export default function FormContainer({
  children,
  onSubmit,
  className,
}: {
  onSubmit?;
  children: React.ReactNode;
  className?: string;
}) {
  return <form className={`${className || ""}`}>{children}</form>;
}
