import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentController } from 'src/controllers/comment.controller';
import { Comment } from 'src/entities/comment.entity';
import { Notification } from 'src/entities/notification.entity';
import { Post } from 'src/entities/post.entity';
import { CommentService } from 'src/services/comment.service';
import { NotificationService } from 'src/services/notification.service';
import { PostService } from 'src/services/post.service';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Post, Notification])],
  controllers: [CommentController],
  providers: [CommentService, PostService,NotificationService],
})
export class CommentModule {}
