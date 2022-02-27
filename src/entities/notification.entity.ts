import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Comment } from './comment.entity';
import { Post } from './post.entity';
import { User } from './user.entity';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  isNotified: boolean;

  @Column({ nullable: true })
  postId?: number;

  @ManyToOne(() => Post, (post) => post.notifications)
  @JoinColumn({name: 'postId'})
  post?: Post;

  @Column({ nullable: true })
  commentId?: number;

  @ManyToOne(() => Comment, (comment) => comment.notifications)
  @JoinColumn({name: 'commentId'})
  comment?: Comment;

  @Column({ nullable: false })
  userId: number;

  @ManyToOne(() => User, (user) => user.notifications)
  @JoinColumn({name: 'userId'})
  user: User;

  @Column({ nullable: false })
  fromUserId: number;

  @ManyToOne(() => User)
  @JoinColumn({name: 'fromUserId'})
  from: User;
}
