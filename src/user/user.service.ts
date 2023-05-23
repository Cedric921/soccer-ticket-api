import { Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { CreateUserDTO, UpdateUserDTO } from './user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUsers() {
    return { message: 'all users' };
  }

  async getOne(id: string) {
    return { message: 'get one', id };
  }

  async create(dto: CreateUserDTO) {
    return { message: 'create user', dto };
  }

  async updateUser(id: string, dto: UpdateUserDTO) {
    const user = await this.prisma.user.update({
      where: { id },
      data: { ...dto },
    });

    delete user.password;

    return { message: 'updated', user };
  }
}
