import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';

export enum ImageType {
  PHOTOS = 'photos',
  TRASH = 'trash',
}

@Entity('images')
export class ImageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column()
  originalName: string;

  @Column()
  size: number;

  @Column()
  mimetype: string;

  @ManyToOne(() => UserEntity, (user) => user.images)
  user: UserEntity;

  @DeleteDateColumn()
  deletedAt?: Date;
}
