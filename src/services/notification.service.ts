import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from 'src/entities/notification.entity';
import { Notification as NotificationDto } from 'src/dtos/notification/notification.dto';
import { In, IsNull, Not, Repository } from 'typeorm';
import { SeenNotification } from 'src/dtos/notification/seenNotifications';
import { GetNotification } from 'src/dtos/notification/getNotificaiton.dto';
import { NotificationType } from 'src/enums/NotificationType';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
  ) {}

  async getNotifications(notificationDto: GetNotification) {
    let notifications;
    switch (notificationDto.notificationType) {
      case NotificationType.PostLike:
        notifications = this.getUsersLikingPost(notificationDto.userId);
        break;
      case NotificationType.CommentLike:
        notifications = this.getUsersLikingComment(notificationDto.userId);
        break;
      case NotificationType.CommentOnPost:
        notifications = this.getUsersCommentOnPost(notificationDto.userId);
        break;
      default:
        throw new Error('Wrong notification type');
    }
    return notifications;
  }

  async getUsersLikingPost(userId: number) {
    const notifications = await this.notificationRepository.find({
      relations: ['post', 'from'],
      where: {
        postId: Not(IsNull()),
        commentId: null,
        isNotified: false,
        userId: userId,
      },
    });
    return notifications;
  }

  async getUsersLikingComment(userId: number) {
    const notifications = await this.notificationRepository.find({
      relations: ['comment', 'from'],
      where: {
        postId: null,
        commentId: Not(IsNull()),
        isNotified: false,
        userId: userId,
      },
    });
    return notifications;
  }

  async getUsersCommentOnPost(userId: number) {
    const notifications = await this.notificationRepository.find({
      relations: ['post', 'comment', 'from'],
      where: {
        postId: Not(IsNull()),
        commentId: Not(IsNull()),
        isNotified: false,
        userId: userId,
      },
    });
    return notifications;
  }

  async create(notification: NotificationDto) {
    const newComment = await this.notificationRepository.create({
      ...notification,
    });
    await this.notificationRepository.save(newComment);
    return newComment;
  }

  async seenNotifications(notification: SeenNotification) {
    const newComment = await this.notificationRepository.update(
      {
        id: In(notification.notificationIds),
      },
      { isNotified: true },
    );
    return newComment;
  }
}
