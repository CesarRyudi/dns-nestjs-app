import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LogService } from './log.service';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logService: LogService) {}

  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const logMessage = {
      path: request.url,
      method: request.method,
      statusCode: status,
      message: exception.message,
      stack: exception.stack,
    };

    const shouldLogError = process.env.SHOULD_LOG_ERROR === 'true';

    if(shouldLogError) await this.logService.error('Exception error', logMessage);

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url, 
      message: exception.message,
    });
  }
}
