import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  // 生成token
  createToken(user) {
    return this.jwtService.sign(user);
  }

  // 登录
  async login(user) {
    const token = this.createToken(user);
    return { token };
  }
}
