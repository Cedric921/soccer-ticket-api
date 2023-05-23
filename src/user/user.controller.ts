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

@Controller('users')
export class UserController {
  @UseGuards(AuthGuard('jwt'), new RolesGuard(['ADMIN']))
  @Get()
  getUsers() {
    return { message: 'all users' };
  }

  @UseGuards(AuthGuard('jwt'), new RolesGuard(['ADMIN']))
  @Get('me')
  getConnectedUser(@Req() req: Request) {
    return { user: req.user };
  }

  @UseGuards(AuthGuard('jwt'), new RolesGuard(['ADMIN']))
  @Get(':id')
  getUser(@Param('id') id: string) {
    return { message: 'One user', id };
  }

  @UseGuards(AuthGuard('jwt'), new RolesGuard(['ADMIN']))
  @Post()
  createUser(@Body() dto: any) {
    return { message: 'created', dto };
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  updateUser(@Body() dto: any, @Param('id') id: string) {
    return { message: 'updated ', id, dto };
  }
}
