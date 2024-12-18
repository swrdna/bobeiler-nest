import { Injectable } from '@nestjs/common';
import { LoginDTO } from './dto/login.dto';
import { UsersService } from '@/modules/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(params: LoginDTO) {
    try {
      const user = await this.usersService.validateLogin(params);
      const token = await this.jwtService.signAsync({ user, sub: user.id });

      return { access_token: token };
    } catch (error) {
      throw error;
    }
  }
}
