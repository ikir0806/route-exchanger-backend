import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouteEntity } from './entities/route.entity';
import { RoutesController } from './routes.controller';
import { RoutesService } from './routes.service';

@Module({
  controllers: [RoutesController],
  providers: [RoutesService],
  imports: [TypeOrmModule.forFeature([RouteEntity])],
})
export class RoutesModule {}
