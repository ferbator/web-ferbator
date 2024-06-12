import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class TimingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = Date.now();
    return next.handle().pipe(
      tap(() => {
        const end = Date.now();
        const elapsed = end - start;
        context
          .switchToHttp()
          .getResponse()
          .header('X-Response-Time', `${elapsed}ms`);
      }),
    );
  }
}
