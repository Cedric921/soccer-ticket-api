import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { CreateUserDTO, UpdateUserDTO } from './user.dto';
import * as argon from 'argon2';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  async getUsers(): Promise<{
    message: string;
    data: {
      id: string;
      email: string;
      names: string;
      role: string;
      createdAt: Date;
      updatedAt: Date;
    }[];
  }> {
    try {
      const users = await this.prisma.user.findMany();
      const data = users.map((user) => {
        const { password, ...others } = user;
        return others;
      });
      return { message: 'fetched with success', data };
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async getOne(id: string) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });

      delete user.password;

      return { message: 'get user with success', data: user };
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async create(dto: CreateUserDTO): Promise<{
    message: string;
    data: User;
  }> {
    try {
      const hash = await argon.hash(dto.password);

      const user = await this.prisma.user.create({
        data: { ...dto, password: hash },
      });

      delete user.password;
      return { message: 'create user with success', data: user };
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async updateUser(
    id: string,
    dto: UpdateUserDTO,
  ): Promise<{
    message: string;
    data: User;
  }> {
    try {
      const user = await this.prisma.user.update({
        where: { id },
        data: { ...dto },
      });

      delete user.password;

      return { message: 'updated', data: user };
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
}
