import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsString
} from 'class-validator';
import { User } from './user.dto';

export class UpdateUser extends User {
  @IsDefined()
  @IsString()
  @ApiProperty({ type: String })
  email: string;
}
