import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() payload: { email: string; password: string }) {
    return this.authService.login(payload.email, payload.password);
  }

  @Get('roles')
  getRoles() {
    return this.authService.getRoles();
  }
}
