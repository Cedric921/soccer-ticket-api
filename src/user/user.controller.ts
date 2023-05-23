import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { UserService } from './user.service';
import { CreateUserDTO, UpdateUserDTO } from './user.dto';
import { GetUser } from 'src/auth/decorator/getUser.decorator';
import { User } from '@prisma/client';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'), new RolesGuard(['ADMIN']))
  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @UseGuards(AuthGuard('jwt'), new RolesGuard(['ADMIN']))
  @Get('me')
  getConnectedUser(@GetUser() user: User) {
    return { data: user };
  }

  @UseGuards(AuthGuard('jwt'), new RolesGuard(['ADMIN']))
  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.userService.getOne(id);
  }

  @UseGuards(AuthGuard('jwt'), new RolesGuard(['ADMIN']))
  @Post()
  createUser(@Body() dto: CreateUserDTO) {
    return this.userService.create(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  updateUser(@Body() dto: UpdateUserDTO, @Param('id') id: string) {
    return this.userService.updateUser(id, dto);
  }
}
