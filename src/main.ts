import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';

import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { JwtAuthGuard } from './common/guards/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // cors
  app.setGlobalPrefix('/api/v1'); // 请求公共前缀
  app.useGlobalFilters(new HttpExceptionFilter()); // 注册全局http错误过滤器（注意这里只能传入实例而非类）
  app.useGlobalInterceptors(new TransformInterceptor()); // 注册全局转换拦截器
  app.useGlobalPipes(new ValidationPipe()); // 注册全局校验管道
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector))); // !含义待确认
  app.useGlobalGuards(new JwtAuthGuard(app.get(Reflector))); // 注册全局token权限校验
  await app.listen(3000);
}
bootstrap();
