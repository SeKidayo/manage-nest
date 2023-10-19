import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
// 表明使用该Public装饰器的uc不需要校验权限
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
