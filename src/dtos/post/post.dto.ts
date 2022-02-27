import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDefined,
  IsNumber
} from 'class-validator';
import { CreatePost } from './createPost.dto';

export class Post extends CreatePost {
  @Type(() => Number)
  @IsDefined()
  @IsNumber({ allowNaN: false, maxDecimalPlaces: 0 })
  @ApiProperty({ type: Number })
  id: number;
}
