import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post, Query
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreatePost } from 'src/dtos/post/createPost.dto';
import { PostService } from 'src/services/post.service';

@Controller('post')
@ApiTags('Post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  @ApiQuery({ type: Number, name: 'postId' })
  async getMenu(@Query('postId') postId: number) {
    return this.postService.get(Number(postId));
  }

  @Post()
  @ApiBody({ type: CreatePost })
  async create(@Body() createPost: CreatePost) {
    return await this.postService.create(createPost);
  }

  // @Put()
  // @ApiBody({ type: UpdatePost })
  // async update(@Body() updatePost: UpdatePost) {
  //   return await this.postService.update(updatePost);
  // }

  @Delete(':postId')
  @ApiParam({ type: Number, name: 'postId' })
  async delete(@Param('postId') postId: number) {
    return await this.postService.delete(postId);
  }
}
