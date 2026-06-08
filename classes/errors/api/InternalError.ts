import APIError from "./APIError";

export default class InternalError extends APIError {
  constructor() {
    super(
      "An internal error occured with the API, please check log messages for further debugging.",
    );
    this.name = "InternalError";
  }
}
