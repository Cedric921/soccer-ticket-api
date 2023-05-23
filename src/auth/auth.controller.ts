import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO, SignupDTO } from './dto/auth.dto';

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
}
