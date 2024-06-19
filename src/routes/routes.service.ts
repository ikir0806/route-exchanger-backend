import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRouteDto } from './dto/create-route.dto';
import { RouteEntity } from './entities/route.entity';

@Injectable()
export class RoutesService {
  constructor(
    @InjectRepository(RouteEntity)
    private repository: Repository<RouteEntity>,
  ) {}

  async findAll() {
    return console.log('Hello');
  }

  async create(dto: CreateRouteDto, userId: number) {
    return this.repository.save({ ...dto, user: { id: userId } });
  }
}
