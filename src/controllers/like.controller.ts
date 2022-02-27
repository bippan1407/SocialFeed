import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Like } from 'src/dtos/like/like.dto';
import { LikeService } from 'src/services/like.service';

@Controller('like')
@ApiTags('Like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post()
  @ApiBody({
    type: Like,
    description: ` 
    referenceType is an Enum 
  
    ReferenceType {
      Post = 1,
      Comment
    }

    referenceId is Id of post or comment
  `,
  })
  async create(@Body() like: Like) {
    return await this.likeService.create(like);
  }
}
