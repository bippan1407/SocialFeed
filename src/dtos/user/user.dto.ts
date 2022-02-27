import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDefined,
  IsNumber
} from 'class-validator';
import { CreateUser } from './createUser.dto';

export class User extends CreateUser {
  @Type(() => Number)
  @IsDefined()
  @IsNumber({ allowNaN: false, maxDecimalPlaces: 0 })
  @ApiProperty({ type: Number })
  id: number;
}
