import { MapEntity } from 'src/map/entities/map.entity';
import { MarkerEntity } from 'src/marker/entities/marker.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('route')
export class RouteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  location: string;

  @Column()
  mapFilename: string;

  @ManyToOne(() => UserEntity, (user) => user.routes)
  user: UserEntity;

  @OneToMany(() => MarkerEntity, (marker) => marker.route)
  markers: MarkerEntity[];

  @OneToOne(() => MapEntity, (map) => map.route)
  map: MapEntity;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
