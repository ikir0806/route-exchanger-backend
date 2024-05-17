import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarkerEntity } from './entities/marker.entity';
import { MarkersController } from './markers.controller';
import { MarkersService } from './markers.service';

@Module({
  controllers: [MarkersController],
  providers: [MarkersService],
  imports: [TypeOrmModule.forFeature([MarkerEntity])],
})
export class MarkersModule {}
