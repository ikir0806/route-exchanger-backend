import { RouteEntity } from 'src/routes/entities/route.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('map')
export class MapEntity {
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

  @OneToOne(() => RouteEntity, (route) => route.map)
  @JoinColumn()
  route: RouteEntity;

  @DeleteDateColumn()
  deletedAt?: Date;
}
