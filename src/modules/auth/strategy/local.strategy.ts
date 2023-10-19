import { BadRequestException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { IStrategyOptions, Strategy } from 'passport-local';
import { User } from 'src/modules/user/entity/user.entity';
import { compareSync } from 'src/utils/bcrypt.util';
import { Repository } from 'typeorm';

/**
 * 处理认证
 * https://docs.nestjs.cn/10/security?id=%e8%ae%a4%e8%af%81%ef%bc%88authentication%ef%bc%89
 */

export class LocalStrategy extends PassportStrategy(Strategy) {
  // Strategy 表明使用的策略为 passport-local
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    } as IStrategyOptions);
  }

  async validate(username: string, password: string) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.username=:username', { username })
      .getOne();

    if (!user) {
      throw new BadRequestException('用户名不正确');
    }

    if (!compareSync(password, user.password)) {
      throw new BadRequestException('密码错误');
    }

    return {
      id: user.id,
      username: user.username,
    };
  }
}
