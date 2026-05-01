import * as api from "@/app/api"
import { SubmitEventHandler } from "react"

interface FormCardProps {
	endpoint: string
	method: api.requestTypeSupport
	content: api.contentTypeSupport
	onSubmit?: Function //in case you need to implement a custom submission handling
	validator?: FormValidatorHandler //a custom validator function for the data entered if needed. Possibly not useful since entities can potentially validate on their own?
	postSubmit?: Function
	useToken: boolean

	children?: any
}

export interface FormValidatorHandler {
	(data: any): any
}

export interface FormPostSubmissionHandler {
	(result: any): any
}

// function SubmissionHandler(e:any, endpoint:string, useToken:boolean, method:api.requestTypeSupport, content:api.contentTypeSupport) {
async function SubmissionHandler(e:any, props:FormCardProps) {
	e.preventDefault()
	console.log("<OMEGA> i'm talking inside the component's default callback")

	const formData = new FormData(e.currentTarget)
    const values = Object.fromEntries(formData) as any;

	// console.log(values)

	let res = await api.call(props.endpoint, props.useToken, {dataOnly:true, method: props.method, contentType: props.content, body:JSON.stringify(values)}) //maybe, check and switch for general api calling, i need to see this ig.

	if (props.postSubmit) props.postSubmit(res)
}

export default function FormCard(
	{
		endpoint,
		method = "POST",
		content = "json", //from API Handler. bruh.
		onSubmit, 
		postSubmit,
		validator,
		children,
		useToken,
	} : FormCardProps
) {
	return (
		<form onSubmit={(event) => onSubmit ? onSubmit(event, {endpoint, method, content, useToken, postSubmit}) : SubmissionHandler(event, {endpoint, method, content, useToken, postSubmit}) /* fallback to built-in handler if not declared*/}>
			{ children }
		</form>
	)
}