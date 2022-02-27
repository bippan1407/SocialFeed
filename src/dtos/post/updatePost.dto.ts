import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { Post } from './post.dto';

export class UpdatePost extends Post {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String })
  content: string;
}
