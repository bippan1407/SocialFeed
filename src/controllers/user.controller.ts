import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateUser } from 'src/dtos/user/createUser.dto';
import { UpdateUser } from 'src/dtos/user/updateUser.dto';
import { UserService } from 'src/services/user.service';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiQuery({ type: Number, name: 'userId' })
  async getMenu(@Query('userId') userId: number) {
    return this.userService.get(Number(userId));
  }

  @Post()
  @ApiBody({ type: CreateUser })
  async create(@Body() createUser: CreateUser) {
    return await this.userService.create(createUser);
  }

  @Put()
  @ApiBody({ type: UpdateUser })
  async update(@Body() updateUser: UpdateUser) {
    return await this.userService.update(updateUser);
  }

  @Delete(':userId')
  @ApiParam({ type: Number, name: 'userId' })
  async delete(@Param('userId') userId: number) {
    return await this.userService.delete(userId);
  }
}
