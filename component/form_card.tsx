// import * as api from "@/app/api";
import { useApi } from "@/hooks/api/useApi";
import { SubmitEventHandler } from "react";

interface FormCardProps {
  endpoint: string;
  method: string;
  content: string;
  onSubmit?: CallableFunction; //in case you need to implement a custom submission handling
  validator?: FormValidatorHandler; //a custom validator function for the data entered if needed. Possibly not useful since entities can potentially validate on their own?
  postSubmit?: CallableFunction;
  useToken: boolean;

  children?: any;
}

export interface FormValidatorHandler {
  (data: unknown): unknown;
}

export interface FormPostSubmissionHandler {
  (result: unknown): unknown;
}

// function SubmissionHandler(e:any, endpoint:string, useToken:boolean, method:api.requestTypeSupport, content:api.contentTypeSupport) {
function SubmissionHandler(e: any, props: FormCardProps) {
  e.preventDefault();
  // console.log("i'm talking inside the component's default callback");

  const formData = new FormData(e.currentTarget);
  // const values = Object.fromEntries(formData);

  // console.log(values)

  const [data, loading, success] = useApi({
    uri: props.endpoint,
    useToken: props.useToken,
    dataOnly: true,
    req: {
      method: props.method,
      body: formData,
    },
  });

  // await api.call(props.endpoint, props.useToken, {
  // dataOnly: true,
  // method: props.method,
  // contentType: props.content,
  // body: JSON.stringify(values),
  // }); //maybe, check and switch for general api calling, i need to see this ig.

  if (props.postSubmit) props.postSubmit([data, loading, success]);
}

export default function FormCard({
  endpoint,
  method = "POST",
  content = "json", //from API Handler. bruh.
  onSubmit,
  postSubmit,
  validator,
  children,
  useToken,
}: FormCardProps) {
  return (
    <form
      onSubmit={
        (event) =>
          onSubmit
            ? onSubmit(event, {
                endpoint,
                method,
                content,
                useToken,
                postSubmit,
              })
            : SubmissionHandler(event, {
                endpoint,
                method,
                content,
                useToken,
                postSubmit,
              }) /* fallback to built-in handler if not declared*/
      }
    >
      {children}
    </form>
  );
}

export function GenericFormLayout({
  title,
  subtitle,
  backlink,
  children,
}: {
  title: string;
  subtitle: string;
  backlink: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className="
        w-full max-w-lg
        bg-white
        border border-gray-200
        rounded-2xl
        shadow-sm
        px-8 py-8
      "
    >
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>

        <p className="text-gray-500 text-sm mt-1">{subtitle}</p>
      </div>

      <section className="flex flex-col gap-4">{children}</section>
    </section>
  );
}
