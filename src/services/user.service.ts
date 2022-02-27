import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUser } from 'src/dtos/user/createUser.dto';
import { UpdateUser } from 'src/dtos/user/updateUser.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async get(userId: number) {
    const user = await this.userRepository.find({
      relations: ['posts', 'comments'],
      where: {
        id: userId,
      },
    });
    return user;
  }

  async create(createUser: CreateUser) {
    const newCategory = await this.userRepository.create({ ...createUser });
    await this.userRepository.save(newCategory);
    return newCategory;
  }

  async update(updateUser: UpdateUser) {
    let user = await this.userRepository.findOneOrFail({
      id: updateUser.id,
    });
    user = { ...user, ...updateUser };
    user = await this.userRepository.save(user);
    return user;
  }

  async delete(userId: number) {
    await this.userRepository.delete({
      id: userId,
    });
  }
}
