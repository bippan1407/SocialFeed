import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeController } from 'src/controllers/like.controller';
import { Like } from 'src/entities/like.entity';
import { Notification } from 'src/entities/notification.entity';
import { LikeService } from 'src/services/like.service';
import { NotificationService } from 'src/services/notification.service';

@Module({
  imports: [TypeOrmModule.forFeature([Like, Notification])],
  controllers: [LikeController],
  providers: [LikeService, NotificationService],
})
export class LikeModule {}
