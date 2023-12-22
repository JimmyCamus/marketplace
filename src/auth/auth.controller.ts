import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { SignInDto } from './dto/signin.dto';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @Post()
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.login(signInDto);
  }

  @Get()
  getProfile(@Request() req: Request) {
    return req['user'];
  }
}
