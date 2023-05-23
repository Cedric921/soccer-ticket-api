import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { UserService } from './user.service';
import { CreateUserDTO, UpdateUserDTO } from './user.dto';

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
  getConnectedUser(@Req() req: Request) {
    return { data: req.user };
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
