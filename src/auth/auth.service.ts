import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/auth.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async login({email, password}: LoginDto) {
    const user = await this.usersService.findOne({email});
    if (!user) {
      throw new Error('Invalid credentials');
    }

    if (!await this.usersService.checkPassword(user, password)) {
      throw new Error('Invalid credentials');
    }

    if (!user.isActive) {
      throw new Error('Inactive user');
    }

    const payload = { sub: user.id, email: user.email, name: user.name, roles: user.roles };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

}
