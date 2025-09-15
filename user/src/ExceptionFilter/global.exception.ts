
import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException, UnauthorizedException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class CatchEverythingFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

    catch(exception: unknown, host: ArgumentsHost): void {
        // In certain situations `httpAdapter` might not be available in the
        // constructor method, thus we should resolve it here.
        const { httpAdapter } = this.httpAdapterHost;

        const ctx = host.switchToHttp();
        if (exception instanceof HttpException) {
            const httpStatus = exception.getStatus();
            const response: any = exception.getResponse();
            let responseBody: any;

            if (typeof response === 'string') {
                // Trường hợp message trả về là string
                responseBody = {
                    message: response,
                    httpStatusCode: httpStatus,
                };
            } else if (Array.isArray(response.message)) {
                // Trường hợp validation error (class-validator)
                responseBody = {
                    message: response.message,
                    httpStatusCode: httpStatus,
                };
            } else if (typeof response.message === 'string') {
                // Trường hợp UnauthorizedException, NotFoundException, ...
                responseBody = {
                    message: response.message,
                    httpStatusCode: httpStatus,
                };
            }
            httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
        }
    }
}
