import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../ormconfig';
import { CommentModule } from './modules/comment.module';
import { LikeModule } from './modules/like.module';
import { NotificationModule } from './modules/notification.module';
import { PostModule } from './modules/post.module';
import { UserModule } from './modules/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ...config,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    PostModule,
    CommentModule,
    LikeModule,
    NotificationModule
  ],
})
export class AppModule {}
