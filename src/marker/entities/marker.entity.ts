import { ImageEntity } from 'src/image/entities/image.entity';
import { RouteEntity } from 'src/route/entities/route.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('marker')
export class MarkerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  coordinates: string;

  @ManyToOne(() => RouteEntity, (route) => route.markers)
  route: RouteEntity;

  @OneToMany(() => ImageEntity, (image) => image.marker)
  images: ImageEntity[];
}
