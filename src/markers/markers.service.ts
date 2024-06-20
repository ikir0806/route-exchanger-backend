import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMarkerDto } from './dto/create-marker.dto';
import { MarkerEntity } from './entities/marker.entity';

@Injectable()
export class MarkersService {
  constructor(
    @InjectRepository(MarkerEntity)
    private repository: Repository<MarkerEntity>,
  ) {}

  async create(dtos: CreateMarkerDto[], routeId: number) {
    return dtos.map((dto) =>
      this.repository.save({ ...dto, route: { id: routeId } }),
    );
  }
}
