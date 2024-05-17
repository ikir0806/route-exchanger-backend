import { MarkerEntity } from 'src/markers/entities/marker.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('routes')
export class RouteEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  location: string;

  @Column()
  marksNumber: number;

  @ManyToOne(() => UserEntity, (user) => user.routes)
  user: UserEntity;

  @OneToMany(() => MarkerEntity, (marker) => marker.route)
  markers: MarkerEntity[];
}
