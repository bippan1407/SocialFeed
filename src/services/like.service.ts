import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from 'src/entities/like.entity';
import { Like as LikeDto } from 'src/dtos/like/like.dto';
import { getConnection, Repository } from 'typeorm';
import { ReferenceType } from 'src/enums/ReferenceType';
import { NotificationService } from './notification.service';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private likeRepository: Repository<Like>,
    private notificationService: NotificationService,
  ) {}

  async create(like: LikeDto) {
    let create: any = {
      reference: '',
    };
    switch (like.referenceType) {
      case 1:
        create = {
          ...create,
          reference: ReferenceType[1],
          referenceKey: 'postId',
        };
        break;
      case 2:
        create = {
          ...create,
          reference: ReferenceType[2],
          referenceKey: 'commentId',
        };
        break;
      default:
        throw new Error('Wrong Reference Type');
    }
    create = {
      ...create,
      referenceType: like.referenceType,
      referenceId: like.referenceId,
    };
    const test: any = await getConnection()
      .getRepository(create.reference)
      .createQueryBuilder(create.reference.toLowerCase())
      .where(`${create.reference.toLowerCase()}.id = :id`, {
        id: create.referenceId,
      })
      .getOne();
    console.log({ create });
    console.log({ test });

    const newEntity = await this.likeRepository.create({
      userId: like.userId,
      isLiked: true,
      [create.reference.toLowerCase()]: test,
    });

    if (test.userId !== like.userId) {
      // create notification
      await this.notificationService.create({
        isNotified: false,
        userId: test.userId,
        fromUserId: like.userId,
        [create.referenceKey]: create.referenceId,
      });
    }

    await this.likeRepository.save(newEntity);
    return newEntity;
  }
}
