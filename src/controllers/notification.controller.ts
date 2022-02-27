import { Body, Controller, Post, Put } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { GetNotification } from 'src/dtos/notification/getNotificaiton.dto';
import { SeenNotification } from 'src/dtos/notification/seenNotifications';
import { NotificationService } from 'src/services/notification.service';

@Controller('notifications')
@ApiTags('Notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  @ApiBody({
    type: GetNotification,
    description: `
    notificationType is an Enum

    NotificationType {
      PostLike = 1,
      CommentLike,
      CommentOnPost
    }
  `,
  })
  async getNotificactionForLikesOnPost(@Body() notification: GetNotification) {
    return this.notificationService.getNotifications(notification);
  }

  @Put()
  @ApiBody({
    type: SeenNotification,
    description: `
    send notification ids that are already seen by user so that user does not receive back the notification again
    `,
  })
  async seenNotifications(@Body() seen: SeenNotification) {
    return this.notificationService.seenNotifications(seen);
  }
}
