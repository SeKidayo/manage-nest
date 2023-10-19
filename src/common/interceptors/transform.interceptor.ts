import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

import { RESPONSE_CODE } from 'src/constants/common.constants';

/**
 * 转换拦截器: 转换从函数返回的结果
 */
@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) => ({
        code: RESPONSE_CODE.SUCCESS,
        message: '请求成功！',
        data,
      })),
    );
  }
}
