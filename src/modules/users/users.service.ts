import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll() {
    return `This action returns all users`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async validateLogin(params: { username: string; password: string }) {
    try {
      const { username, password } = params;
      if (username === 'admin' && password === 'asdfasdf') {
        return { id: 1, username: 'admin', fullname: 'Admin' };
      } else {
        throw new BadRequestException('Invalid username or password');
      }
    } catch (error) {
      throw error;
    }
  }
}
