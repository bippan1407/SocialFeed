import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment as CommnetDto } from 'src/dtos/comment/comment.dto';
import { Comment } from 'src/entities/comment.entity';
import { Post } from 'src/entities/post.entity';
import { Repository } from 'typeorm';
import { NotificationService } from './notification.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    private notificationService: NotificationService,
  ) {}

  async get(commentId: number) {
    const post = await this.commentRepository.find({
      relations: ['user', 'likes'],
      where: {
        id: commentId,
      },
    });
    return post;
  }

  async create(comment: CommnetDto) {
    const post = await this.postRepository.findOneOrFail({
      id: comment.postId,
    });
    let newComment = await this.commentRepository.create({ ...comment });
    newComment = await this.commentRepository.save(newComment);
    if (newComment.userId !== post.userId) {
      await this.notificationService.create({
        isNotified: false,
        userId: post.userId,
        fromUserId: comment.userId,
        postId: comment.postId,
        commentId: newComment.id,
      });
      return newComment;
    }
  }
}
