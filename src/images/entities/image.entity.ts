import { MarkerEntity } from 'src/markers/entities/marker.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @ManyToOne(() => MarkerEntity, (marker) => marker.images)
  marker: MarkerEntity;

  @DeleteDateColumn()
  deletedAt?: Date;
}
