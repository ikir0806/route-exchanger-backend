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

  find(userId: number) {
    return this.repository.findOneBy({
      user: {
        id: userId,
      },
    });
  }

  create(file: Express.Multer.File, userId: number) {
    return this.repository.save({
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
      user: { id: userId },
    });
  }

  async remove(userId: number) {
    const qb = this.repository.createQueryBuilder('file');
    const file = await this.find(userId);

    // console.log(await qb.getOne());

    qb.where('userId = :userId', {
      userId,
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
