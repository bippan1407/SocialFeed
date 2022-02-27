import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString
} from 'class-validator';

export class CreatePost {
  @IsDefined()
  @IsString()
  @ApiProperty({ type: String })
  title: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  content: string;

  @Type(() => Number)
  @IsDefined()
  @IsNumber({ allowNaN: false, maxDecimalPlaces: 0 })
  @ApiProperty({ type: Number })
  userId: number;
}
