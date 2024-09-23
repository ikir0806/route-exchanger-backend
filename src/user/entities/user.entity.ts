import { AvatarEntity } from 'src/avatar/entities/avatar.entity';
import { RouteEntity } from 'src/route/entities/route.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ unique: true })
  login: string;

  @Column()
  description: string;

  @OneToMany(() => RouteEntity, (route) => route.user)
  routes?: RouteEntity[];

  @OneToOne(() => AvatarEntity, (avatar) => avatar.user)
  avatar: AvatarEntity;
}
