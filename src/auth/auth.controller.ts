import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth.dto';
import { catchError, from, map, of } from 'rxjs';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  login(@Body() createAuthDto: LoginDto) {
    return from(this.authService.login(createAuthDto)).pipe(
      map((res) => ({
        status: HttpStatus.OK,
        message: 'User login successful',
        token: res.access_token,
      })),
      catchError((err) => of({
        status: HttpStatus.PRECONDITION_FAILED,
        message: err.message,
      })),
    );
  }

}
