import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne, PrimaryGeneratedColumn
} from 'typeorm';
import { Comment } from './comment.entity';
import { Post } from './post.entity';
import { User } from './user.entity';

@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null, nullable: true })
  isLiked: boolean;

  @Column({ nullable: true })
  postId: number;

  @ManyToOne(() => Post, (post) => post.likes)
  @JoinColumn({name: 'postId'})
  post: Post;

  @Column({ nullable: true })
  commentId: number;

  @ManyToOne(() => Comment, (comment) => comment.likes)
  @JoinColumn({name: 'commentId'})
  comment: Comment;

  @Column({ name: 'userId', nullable: false })
  userId: number;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: 'userId' })
  user: User;
}
