import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MapEntity } from './entities/map.entity';
import { MapController } from './map.controller';
import { MapService } from './map.service';

@Module({
  controllers: [MapController],
  providers: [MapService],
  imports: [TypeOrmModule.forFeature([MapEntity])],
})
export class MapModule {}
