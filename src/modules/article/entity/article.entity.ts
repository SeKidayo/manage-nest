import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 128,
  })
  title: string;

  @Column({
    length: 32,
  })
  author: string;

  @Column('text')
  content: string;

  @Column({
    default: '',
  })
  thumb_url: string;

  @Column('int')
  type: number;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  create_time: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  update_time: Date;
}
