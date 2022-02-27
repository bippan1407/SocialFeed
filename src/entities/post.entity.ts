import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Comment } from './comment.entity';
import { Like } from './like.entity';
import { Notification } from './notification.entity';
import { User } from './user.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: false })
  content: string;

  @Column({ nullable: true })
  imageUrl: string;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @Column({ name: 'userId', nullable:false })
  userId: number;

  @OneToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => Like, (like) => like.post)
  likes: Like[];

  @OneToMany(() => Notification, (notification) => notification.post)
  notifications: Notification[];
}
