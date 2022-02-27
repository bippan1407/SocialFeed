import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Comment } from 'src/dtos/comment/comment.dto';
import { CommentService } from 'src/services/comment.service';

@Controller('comment')
@ApiTags('Comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  @ApiQuery({ type: Number, name: 'commentId' })
  async getMenu(@Query('commentId') commentId: number) {
    return this.commentService.get(Number(commentId));
  }

  @Post()
  @ApiBody({ type: Comment })
  async create(@Body() createComment: Comment) {
    return await this.commentService.create(createComment);
  }
}
