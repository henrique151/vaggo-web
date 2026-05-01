import * as api from "@/app/api"
import { SubmitEventHandler } from "react"

interface FormCardProps {
	endpoint: string
	method: api.requestTypeSupport
	content: api.contentTypeSupport
	onSubmit?: Function, //in case you need to implement a custom submission handling
	validator?: FormValidatorHandler //a custom validator function for the data entered if needed. Possibly not useful since entities can potentially validate on their own?
	postSubmit?: Function

	children: any
}

export interface FormValidatorHandler {
	(data: any): any
}

function SubmissionHandler(e:any) {
	e.preventDefault()
	console.log("<OMEGA> i'm talking inside the component's default callback")
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
	} : FormCardProps
) {
	return (
		<form onSubmit={(event) => onSubmit ? onSubmit(event) : SubmissionHandler(event) /* fallback to built-in handler if not declared*/}>
			{ children }
		</form>
	)
}