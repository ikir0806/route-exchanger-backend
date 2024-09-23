import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum AvatarType {
  PHOTOS = 'photos',
  TRASH = 'trash',
}

@Entity('avatar')
export class AvatarEntity {
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

  @OneToOne(() => UserEntity, (user) => user.avatar)
  @JoinColumn()
  user: UserEntity;

  @DeleteDateColumn()
  deletedAt?: Date;
}
