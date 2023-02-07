class AppError {
  public readonly status: string;
  public readonly message: string;
  public readonly statusCode: number;

  constructor(status: string, message: string, statusCode = 400) {
    this.status = status;
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default AppError;
