import { IsNotEmpty } from 'class-validator';

export class CreateArticleDto {
  @IsNotEmpty({
    message: '文章标题必填',
  })
  readonly title: string;

  @IsNotEmpty({
    message: '作者信息必填',
  })
  readonly author: string;

  readonly content: string;

  readonly type: number;
}
