import { BadRequestException, Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(
    @Body()
    signUpRequest: {
      nickname: string;
      email: string;
      password: string;
    },
  ) {
    try {
      return await this.authService.signUp(signUpRequest);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Post('login')
  async login(
    @Body() authenticateRequest: { email: string; password: string },
  ) {
    try {
      return await this.authService.authenticateUser(authenticateRequest);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
