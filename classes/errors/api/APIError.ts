export default class APIError extends Error {
  constructor(message?) {
    super(
      message ?? "An error occured while processing the API output. Please check console output between services for any messages.",
    );
    this.name = "APIError";
    // Object.setPrototypeOf(this, InvalidCredentialsError.prototype);
  }
}
