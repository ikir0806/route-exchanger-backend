import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRouteDto } from './dto/create-route.dto';
import { RouteEntity } from './entities/route.entity';

@Injectable()
export class RouteService {
  constructor(
    @InjectRepository(RouteEntity)
    private repository: Repository<RouteEntity>,
  ) {}

  async findByLocation(location: string) {
    const qb = this.repository
      .createQueryBuilder('route')
      .where('route.location LIKE :location', {
        location: `%${location}%`,
      });

    return qb.getMany();
  }

  async findByUser(userId: number) {
    const qb = this.repository.createQueryBuilder('route');

    qb.where('route.userId = :userId', { userId });

    return qb.getMany();
  }

  async create(dto: CreateRouteDto, userId: number) {
    return this.repository.save({ ...dto, user: { id: userId } });
  }
}
