import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { hashPassword } from 'src/utils/bcrypt.util';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 32,
  })
  username: string;

  @Column({
    length: 32,
    default: '无名氏',
  })
  nickname: string;

  @Exclude() // 目的：使得某些返回该实体数据的地方隐藏该列；需要与 ClassSerializerInterceptor 配合使用
  @Column()
  password: string;

  @Column({
    default: '',
  })
  avatar: string;

  @Column({
    default: '',
  })
  email: string;

  @Column('simple-enum', {
    enum: ['root', 'author', 'visitor'],
    default: 'visitor',
  })
  role: string;

  @Column({
    name: 'create_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date;

  @Column({
    name: 'update_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateTime: Date;

  @BeforeInsert() // 数据插入前调用该方法确保加密密码
  encryptPWD() {
    this.password = hashPassword(this.password);
  }

  @Expose() // 自定义导出额外的字段
  fullName() {
    return `${this.username}-${this.nickname}`;
  }
}
