import APIError from "./APIError";

export default class TooManyRequestsError extends APIError {
  constructor() {
    super("429. Too Many Requests");
    this.name = "TooManyRequestsError";
  }
}
