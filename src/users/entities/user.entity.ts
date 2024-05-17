import { RouteEntity } from 'src/routes/entities/route.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  login: string;

  @Column()
  description: string;

  @OneToMany(() => RouteEntity, (route) => route.user)
  routes?: RouteEntity[];
}
