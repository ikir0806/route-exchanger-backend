import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarkerEntity } from './entities/marker.entity';
import { MarkerController } from './marker.controller';
import { MarkerService } from './marker.service';

@Module({
  controllers: [MarkerController],
  providers: [MarkerService],
  imports: [TypeOrmModule.forFeature([MarkerEntity])],
})
export class MarkerModule {}
