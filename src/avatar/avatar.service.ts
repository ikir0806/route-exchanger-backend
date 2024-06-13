import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AvatarEntity } from './entities/avatar.entity';

@Injectable()
export class AvatarService {
  constructor(
    @InjectRepository(AvatarEntity)
    private repository: Repository<AvatarEntity>,
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

    qb.where('userId = :userId', {
      userId,
    });

    return qb.softDelete().execute();
  }
}
