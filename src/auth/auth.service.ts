import { PrismaService } from './../prisma/prisma.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { LoginDTO, SignupDTO } from './dto/auth.dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async signup(dto: SignupDTO) {
    try {
      //  generate hash
      const hash = await argon.hash(dto.password);
      // save user to db

      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          role: 'USER',
          names: dto.names,
          password: hash,
        },
      });

      delete user.password;
      // generate token

      // return saved user
      return { message: 'user created', data: user };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        console.log('line11', { error });
        if (error.code === 'P2002')
          throw new ForbiddenException('Credentials taken');
      } else {
        throw new ForbiddenException('Auth error');
      }
    }
  }

  async login(dto: LoginDTO) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new ForbiddenException('Credentials incorrect');
    }

    const pwdMatches = await argon.verify(user.password, dto.password);

    if (!pwdMatches) {
      throw new ForbiddenException('Credentials incorrect');
    }

    delete user.password;
    return { message: 'login succes', data: user };
  }
}
