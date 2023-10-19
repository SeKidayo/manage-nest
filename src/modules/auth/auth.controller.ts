import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Public } from 'src/common/decorators/public.decorator';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(AuthGuard('local')) // 使用本地认证，即走LocalStrategy下的validate方法
  @Post('login')
  async login(@Body() user, @Req() req) {
    // return req.user; // Passport特性：Passport根据 validate方法的返回值自动创建一个user实例，并将其作为 req.user 分配给请求对象
    return this.authService.login(req.user); // 返回token
  }

  // @UseGuards(AuthGuard('jwt')) // 使用jwt认证，即走JwtStrategy下的validate方法
  @Get('userinfo')
  getUserInfo(@Req() req) {
    return req.user; // token解析出的信息
  }
}
