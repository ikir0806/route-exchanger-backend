import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}

  async findById(id: number) {
    return this.repository.findOneBy({ id });
  }

  async findByEmail(email: string) {
    return this.repository.findOneBy({ email });
  }

  create(dto: CreateUserDto) {
    return this.repository.save({ ...dto, description: '' });
  }

  async update(dto: UpdateUserDto) {
    const data = await this.findById(dto.id);
    return this.repository.update(data.id, {
      ...data,
      login: dto.login,
      description: dto.description,
    });
  }
}
