import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiResponse } from '../ApiResponse';
import { ConfigurationService } from '../configuration/configuration.service';
import { ResponseType } from '../response';

import { Exception } from './exception';

@Catch()
export class NestHttpExceptionFilter implements ExceptionFilter {
  constructor(protected readonly configurationService: ConfigurationService) {
    this.configurationService = configurationService;
  }

  public responseData: ResponseType<null> = {
    code: HttpStatus.INTERNAL_SERVER_ERROR,
    message: 'Internal server error.',
    data: null,
  };

  public catch(error: Error, host: ArgumentsHost): void {
    const request: Request = host.switchToHttp().getRequest();
    const response: Response = host.switchToHttp().getResponse<Response>();

    this.responseData.message = error.message;

    let errorResponse: ApiResponse<unknown> = ApiResponse.error(
      this.responseData
    );

    errorResponse = this.handleNestError(error, errorResponse);
    errorResponse = this.handleCoreException(error, errorResponse);

    if (this.configurationService.LOG_ENABLE) {
      const message: string =
        `Method: ${request.method}; ` +
        `Path: ${request.path}; ` +
        `Error: ${errorResponse.message} ` +
        `Stack: ${error.stack}`;

      Logger.error(message);
    }
    response.status(errorResponse.code).json(errorResponse);
  }

  private handleNestError(
    error: Error,
    errorResponse: ApiResponse<unknown>
  ): ApiResponse<unknown> {
    if (error instanceof HttpException) {
      this.responseData.code = error.getStatus();
      this.responseData.message =
        (error.getResponse() as any).message || error.message;
    }
    if (error instanceof UnauthorizedException) {
      this.responseData.code = HttpStatus.UNAUTHORIZED;
      this.responseData.message = errorResponse.message;
    }
    errorResponse = ApiResponse.error(this.responseData);

    return errorResponse;
  }

  private handleCoreException(
    error: Error,
    errorResponse: ApiResponse<unknown>
  ): ApiResponse<unknown> {
    if (error instanceof Exception) {
      this.responseData.code = error.code;
      this.responseData.message = error.message;
    }
    errorResponse = ApiResponse.error(this.responseData);

    return errorResponse;
  }
}
