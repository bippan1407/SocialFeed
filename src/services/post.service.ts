import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePost } from 'src/dtos/post/createPost.dto';
import { UpdatePost } from 'src/dtos/post/updatePost.dto';
import { Post } from 'src/entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async get(postId: number) {
    const post = await this.postRepository.find({
      relations: ['user', 'comments', 'likes'],
      where: {
        id: postId,
      },
    });
    return post;
  }

  async create(createPost: CreatePost) {
    const newCategory = await this.postRepository.create({ ...createPost });
    await this.postRepository.save(newCategory);
    return newCategory;
  }

  async update(updatePost: UpdatePost) {
    let post = await this.postRepository.findOneOrFail({
      id: updatePost.id,
    });
    post = { ...post, ...updatePost };
    post = await this.postRepository.save(post);
    return post;
  }

  async delete(postId: number) {
    await this.postRepository.delete({
      id: postId,
    });
  }
}
