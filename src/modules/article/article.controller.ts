import {
  Controller,
  Body,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  async create(@Body() article: CreateArticleDto) {
    return await this.articleService.create(article);
  }

  @Get()
  async findAll(@Query() query) {
    return await this.articleService.findAll(query);
  }

  @Get(':id')
  async findById(@Param('id') id) {
    return await this.articleService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id, @Body() updateContent) {
    return await this.articleService.updateById(id, updateContent);
  }

  @Delete(':id')
  async remove(@Param('id') id) {
    return await this.articleService.remove(id);
  }
}
