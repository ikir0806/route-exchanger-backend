import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MapEntity } from './entities/map.entity';

@Injectable()
export class MapsService {
  constructor(
    @InjectRepository(MapEntity)
    private repository: Repository<MapEntity>,
  ) {}

  find(routeId: number) {
    return this.repository.findOneBy({
      route: {
        id: routeId,
      },
    });
  }

  create(file: Express.Multer.File, routeId: number) {
    return this.repository.save({
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
      user: { id: routeId },
    });
  }

  async remove(routeId: number) {
    const qb = this.repository.createQueryBuilder('file');
    const file = await this.find(routeId);

    // console.log(await qb.getOne());

    qb.where('routeId = :routeId', {
      routeId,
    });

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const fs = require('fs');

    fs.unlink(`uploads/map/${file.filename}`, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });

    return qb.delete().execute();
  }
}
