import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  RequestTimeoutException,
} from '@nestjs/common';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  // Tiempo máximo de espera en milisegundos (en este ejemplo, 5 minutos o 300000 milisegundos, pero se recomienda 1)
  private readonly timeOut = 300000;

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Aplica el tiempo máximo de espera y captura cualquier error de tiempo de espera
    return next.handle().pipe(
      timeout(this.timeOut),
      catchError((err) => {
        if (err instanceof TimeoutError) {
          // Lanza una excepción si se agota el tiempo de espera
          throw new RequestTimeoutException(
            'Tiempo de espera agotado para la solicitud.',
            'Timeout',
          );
        }
        return throwError(err);
      }),
    );
  }
}
