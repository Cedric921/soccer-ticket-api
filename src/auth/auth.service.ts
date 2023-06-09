import { PrismaService } from './../prisma/prisma.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { LoginDTO, SignupDTO } from './dto/auth.dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: SignupDTO): Promise<{
    message: string;
    data: {
      token: string;
      id: string;
      email: string;
      names: string;
      password: string;
      role: string;
      createdAt: Date;
      updatedAt: Date;
    };
  }> {
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

      const token = await this.signToken(user.id, user.email);

      // return saved user
      return { message: 'user created', data: { ...user, token } };
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

  async login(dto: LoginDTO): Promise<{
    message: string;
    data: {
      token: string;
      id: string;
      email: string;
      names: string;
      password: string;
      role: string;
      createdAt: Date;
      updatedAt: Date;
    };
  }> {
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

    const token = await this.signToken(user.id, user.email);

    delete user.password;
    return { message: 'account  succes', data: { ...user, token } };
  }

  async signToken(userId: string, email: string) {
    const payload = {
      sub: userId,
      email,
    };

    return this.jwt.signAsync(payload, {
      expiresIn: '1d',
      secret: this.config.get('JWT_SECRET'),
    });
  }
}
