import { Injectable } from '@nestjs/common';

import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.repository.find();
  }

  async findOne(id: number): Promise<User> {
    return this.repository.findOneBy({ id });
  }

  async create(payload: User): Promise<User> {
    const newUser = this.repository.create(payload);
    return this.repository.save(newUser);
  }

  async findByUsername(username: string) {
    return this.repository
      .createQueryBuilder('users')
      .addSelect('users.password')
      .where('users.username = :username', { username })
      .getOne();
  }
}
