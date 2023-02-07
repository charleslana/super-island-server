import { Response } from 'express';

export default class AppSuccess {
  public readonly status: string;
  public readonly message: string;
  public readonly statusCode: number;

  constructor(status: string, message: string, statusCode = 200) {
    this.status = status;
    this.message = message;
    this.statusCode = statusCode;
  }

  toJSON(response: Response) {
    return response.status(this.statusCode).json({
      statusCode: this.statusCode,
      status: this.status,
      message: this.message,
    });
  }
}
