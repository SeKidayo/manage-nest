import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './entity/article.entity';
import { articleDto } from './dto/article.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  // 创建文章
  async create(article: Partial<Article>): Promise<Article> {
    const { title } = article;
    if (!title) {
      throw new HttpException('缺少文章标题', HttpStatus.UNAUTHORIZED);
    }
    const doc = await this.articleRepository.findOne({ where: { title } });
    if (doc) {
      throw new HttpException('文章标题重复', HttpStatus.UNAUTHORIZED);
    }
    return this.articleRepository.save(article);
  }

  // 获取某页所有文章
  async findAll(query): Promise<articleDto> {
    const qb = this.articleRepository.createQueryBuilder('article');
    qb.orderBy('article.create_time', 'DESC');

    const total = await qb.getCount();
    const { pageNum = 1, pageSize = 10 } = query;
    qb.limit(pageSize); // limit - 取pageSize行数据
    qb.offset(pageSize * (pageNum - 1)); // offset - 跳过前pageSize * (pageNum - 1)行，从下一行开始取数据

    const articles = await qb.getMany();
    return {
      list: articles,
      total,
    };
  }

  // 获取指定文章
  findById(id): Promise<Article | null> {
    return this.articleRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  // 更新文章
  async updateById(id, updateContent): Promise<Article> {
    const existArticle = await this.articleRepository.findOne({
      where: { id },
    });
    if (!existArticle) {
      throw new HttpException(`id为${id}的文章不存在`, HttpStatus.UNAUTHORIZED);
    }
    const updatedArticle = this.articleRepository.merge(
      existArticle,
      updateContent,
    );
    return this.articleRepository.save(updatedArticle);
  }

  // 删除文章
  async remove(id) {
    const existArticle = await this.articleRepository.findOne({
      where: { id },
    });
    if (!existArticle) {
      throw new HttpException(`id为${id}的文章不存在`, HttpStatus.UNAUTHORIZED);
    }
    return this.articleRepository.remove(existArticle);
  }
}
