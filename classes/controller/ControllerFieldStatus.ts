import ControllerError from "./ControllerError"

export default class ControllerFieldStatus {
    public value: any
    public error: ControllerError | undefined

    constructor(value, error?:ControllerError) {
        this.value = value
        if (error) this.error = error
        
    }
}