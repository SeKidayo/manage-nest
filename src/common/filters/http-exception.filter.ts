import {
  ExceptionFilter,
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { RESPONSE_CODE } from 'src/constants/common.constants';

/**
 * 异常过滤器
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // 获取http应用下的HttpArgumentsHost对象(应用上下文)
    // const request = ctx.getRequest(); // 获取请求对象
    const response = ctx.getResponse(); // 获取响应对象

    const status = exception.getStatus(); // 获取异常状态码
    const exceptionResponse: any = exception.getResponse(); // 获取异常返回信息
    console.log('exception.getResponse() -->', exceptionResponse);

    // 错误信息format
    let errMessage = '';
    if (typeof exceptionResponse === 'object') {
      const isString = typeof exceptionResponse.message === 'string';
      errMessage = isString
        ? exceptionResponse.message
        : exceptionResponse.message[0];
    }

    if (typeof exceptionResponse === 'string') {
      errMessage = exceptionResponse;
    }

    // 若某些情况下取不到具体message，则根据httpstatus输出宽泛报错信息
    const message = errMessage
      ? errMessage
      : `${
          status >= HttpStatus.INTERNAL_SERVER_ERROR
            ? 'Server Error'
            : 'Client Error'
        }`;

    const errorResponse = {
      code: RESPONSE_CODE.FAIL,
      message: message,
      data: {},
    };

    // 设置响应的状态码、数据
    response.status(status);
    response.json(errorResponse);
  }
}
