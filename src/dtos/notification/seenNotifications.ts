import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDefined } from 'class-validator';

export class SeenNotification {
  @IsDefined()
  @IsArray()
  @ApiProperty({ type: [Number] })
  notificationIds: number[];
}
