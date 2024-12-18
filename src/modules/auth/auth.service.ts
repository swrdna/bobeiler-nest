import { Injectable } from '@nestjs/common';
import { LoginDTO } from './dto/login.dto';
import { UsersService } from '@/modules/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async login(params: LoginDTO) {
    const user = await this.usersService.validateLogin(params);

    // TODO
    // sign jwt toke here

    return { access_token: 'jwt-token-here' };
  }
}
