import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(payload: CreateUserDto) {
    const hashedPassword = await this.__hashPassword(payload.password);

    return this.userRepository.create({
      ...payload,
      password: hashedPassword,
    });
  }

  async findAll() {
    return this.userRepository.findAll();
  }

  async findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, payload: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async validateLogin(params: { username: string; password: string }) {
    try {
      const { username, password } = params;

      const user = await this.userRepository.findByUsername(username);
      const isMatch = await this.__isPasswordMatch(password, user?.password);

      delete user?.password;

      if (user && isMatch) {
        return user;
      } else {
        throw new BadRequestException('Invalid username or password');
      }
    } catch (error) {
      throw error;
    }
  }

  private async __hashPassword(password: string) {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    return hash;
  }

  private async __isPasswordMatch(password: string, passwordHash: string) {
    if (passwordHash) {
      return await bcrypt.compare(password, passwordHash);
    }

    return false;
  }
}
