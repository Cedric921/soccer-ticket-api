import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO, SignupDTO } from './dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from './guard/roles.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() dto: LoginDTO) {
    return this.authService.login(dto);
  }

  @Post('signup')
  signup(@Body() dto: SignupDTO) {
    return this.authService.signup(dto);
  }

  @UseGuards(AuthGuard('jwt'), new RolesGuard(['ADMIN', 'USER']))
  @Get('me')
  async getMe() {
    return { message: 'heelop' };
  }
}
