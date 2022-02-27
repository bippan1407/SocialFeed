import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDefined, IsNumber } from 'class-validator';

export class GetNotification {
  @Type(() => Number)
  @IsDefined()
  @IsNumber({ allowNaN: false, maxDecimalPlaces: 0 })
  @ApiProperty({ type: Number })
  notificationType: number;

  @Type(() => Number)
  @IsDefined()
  @IsNumber({ allowNaN: false, maxDecimalPlaces: 0 })
  @ApiProperty({ type: Number })
  userId: number;
}
