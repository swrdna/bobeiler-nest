import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '@/modules/users/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(params: LoginDto) {
    try {
      const user = await this.usersService.validateLogin(params);
      const token = await this.jwtService.signAsync({ user, sub: user.id });

      return { access_token: token };
    } catch (error) {
      throw error;
    }
  }
}
