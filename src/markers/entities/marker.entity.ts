import { RouteEntity } from 'src/routes/entities/route.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('markers')
export class MarkerEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  // @Column()
  // coordinates: LngLat;

  // @Column()
  // imagesArray: UploadFile[];

  @ManyToOne(() => RouteEntity, (route) => route.markers)
  route: RouteEntity;
}
