import { AvatarEntity } from 'src/avatar/entities/avatar.entity';
import { ImageEntity } from 'src/images/entities/image.entity';
import { RouteEntity } from 'src/routes/entities/route.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
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

  @OneToMany(() => ImageEntity, (image) => image.user)
  images: ImageEntity[];

  @OneToOne(() => AvatarEntity, (avatar) => avatar.user)
  avatar: AvatarEntity;
}
