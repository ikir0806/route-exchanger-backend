import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageEntity } from './entities/image.entity';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';

@Module({
  controllers: [ImagesController],
  providers: [ImagesService],
  imports: [TypeOrmModule.forFeature([ImageEntity])],
})
export class ImagesModule {}
