import { Controller, Get, Req, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req) {
    // equivalent to "signIn" on tutorial
    const token = await this.authService.googleLogin(req);
    return {
      access_token: token,
    };
    // TODO: return cookie | redirect to frontend /?jwt=<jwt-token>
  }
}
