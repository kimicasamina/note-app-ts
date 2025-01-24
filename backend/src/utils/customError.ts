// custom-error.ts
export class CustomError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message); // Call the parent constructor with the message
    this.status = status;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor); // Capture the stack trace
  }
}
