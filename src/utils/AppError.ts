export class AppError {
  message;
  statusCode; 

  constructor(message:string, statusCode:number) {
    this.message = message;
    this.statusCode = statusCode;
  }
}
