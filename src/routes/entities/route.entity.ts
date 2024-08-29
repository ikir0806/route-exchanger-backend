import { MapEntity } from 'src/maps/entities/map.entity';
import { MarkerEntity } from 'src/markers/entities/marker.entity';
import { UserEntity } from 'src/users/entities/user.entity';
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

@Entity('routes')
export class RouteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  location: string;

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
