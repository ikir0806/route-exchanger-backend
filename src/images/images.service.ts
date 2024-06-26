import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImageEntity, ImageType } from './entities/image.entity';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(ImageEntity)
    private repository: Repository<ImageEntity>,
  ) {}

  findAll(userId: number, imageType: ImageType) {
    const qb = this.repository.createQueryBuilder('file');

    qb.where('file.userId = :userId', { userId });

    if (imageType === ImageType.PHOTOS) {
      qb.andWhere('file.mimetype ILIKE :type', { type: '%image%' });
    }

    if (imageType === ImageType.TRASH) {
      qb.withDeleted().andWhere('file.deletedAt IS NOT NULL');
    }

    return qb.getMany();
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

  async remove(userId: number, ids: string) {
    const idsArray = ids.split(',');
    userId = 19;

    const qb = this.repository.createQueryBuilder('file');

    qb.where('id IN (:...ids) AND userId = :userId', {
      ids: idsArray,
      userId,
    });

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const fs = require('fs');

    fs.unlink('uploads/fce9ba7fbed536924c.png', (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });

    return qb.delete().execute();
  }
}
