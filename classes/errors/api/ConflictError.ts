import APIError from "./APIError";

export default class ConflictError extends APIError {
  constructor() {
    super("409. Conflict");
    this.name = "ConflictError";
  }
}
