import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LogService } from './log.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logService: LogService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const handlerName = context.getHandler().name;
    const className = context.getClass().name;
 
    // Obtém o valor da variável de ambiente SHOULD_LOG_ALL 
    const shouldLogAll = process.env.SHOULD_LOG_ALL === 'true';

    return next.handle().pipe(
      tap(() => {
        // Verifica se deve fazer o log com base no valor da variável
        if (shouldLogAll) { 
          this.logService.info(
            `Request to ${className}.${handlerName} handled in ${Date.now() - now}ms`,
          );
        }
      }),
    );
  }
}
