import APIError from "./APIError";

export default class BadRequestError extends APIError {
  constructor() {
    super("401. Bad Request");
    this.name = "BadRequestError";
  }
}
