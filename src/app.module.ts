import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService, ConfigModule } from '@nestjs/config';
import envConfig from './config/env';

// 模块
import { ArticleModule } from './modules/article/article.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      // 配置环境设置
      isGlobal: true,
      envFilePath: [envConfig.path],
    }),
    TypeOrmModule.forRootAsync({
      // 数据库连接配置
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PSW'),
        database: configService.get('DB_DATABASE'),
        autoLoadEntities: true, // 自动更新实体依赖，避免手动导入
        synchronize: !envConfig.isProd, // 自动创建数据库表配置，生产环境千万不要使用
        entityPrefix: 't_', // 实体生成的表的公共前缀
      }),
    }),
    ArticleModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
