import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsString
} from 'class-validator';

export class CreateUser {
  @IsDefined()
  @IsString()
  @ApiProperty({ type: String })
  email: string;
}
