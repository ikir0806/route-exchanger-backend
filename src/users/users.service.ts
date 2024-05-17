import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v1 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}

  async findById(id: string) {
    return this.repository.findOneBy({ id });
  }

  async findByEmail(email: string) {
    return this.repository.findOneBy({ email });
  }

  create(dto: CreateUserDto) {
    return this.repository.save({ ...dto, description: '', id: v1() });
  }
}
