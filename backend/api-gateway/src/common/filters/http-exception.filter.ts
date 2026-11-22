import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const { error } = exception;
    const status =
      error?.code ||
      (typeof exception?.status === 'number' ? exception?.status : null) ||
      400;
    console.log('error', exception, status);
    response.status(status).json({
      statusCode: status,
      type: error?.type || null,
      message: error?.message || exception.message,
      data: error?.data || null,
    });
  }
}
