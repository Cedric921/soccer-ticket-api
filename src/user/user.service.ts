import { Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { CreateUserDTO, UpdateUserDTO } from './user.dto';
import * as argon from 'argon2';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUsers() {
    const users = await this.prisma.user.findMany();
    const data = users.map((user) => {
      const { password, ...others } = user;
      return others;
    });
    return { message: 'fetched with success', data };
  }

  async getOne(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    delete user.password;

    return { message: 'get user with success', data: user };
  }

  async create(dto: CreateUserDTO) {
    const hash = await argon.hash(dto.password);

    const user = await this.prisma.user.create({
      data: { ...dto, password: hash },
    });

    delete user.password;
    return { message: 'create user with success', data: user };
  }

  async updateUser(id: string, dto: UpdateUserDTO) {
    const user = await this.prisma.user.update({
      where: { id },
      data: { ...dto },
    });

    delete user.password;

    return { message: 'updated', data: user };
  }
}
