import { Controller, Get, Req, UseGuards, Request, Res } from '@nestjs/common';
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
  async googleAuthRedirect(@Req() req, @Res({ passthrough: true }) res) {
    const token = await this.authService.googleLogin(req);
    const redirectUrl = `${process.env.FRONTEND_URL}/auth`;
    res.cookie('jwtToken', token, {
      httpOnly: true,
      secure: false,
    });
    res.redirect(redirectUrl);

    // TODO: return cookie | redirect to frontend /?jwt=<jwt-token>
  }
}
