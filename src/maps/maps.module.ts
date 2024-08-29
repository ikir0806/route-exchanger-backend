import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MapEntity } from './entities/map.entity';
import { MapsController } from './maps.controller';
import { MapsService } from './maps.service';

@Module({
  controllers: [MapsController],
  providers: [MapsService],
  imports: [TypeOrmModule.forFeature([MapEntity])],
})
export class MapsModule {}
