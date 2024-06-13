import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AvatarController } from './avatar.controller';
import { AvatarService } from './avatar.service';
import { AvatarEntity } from './entities/avatar.entity';

@Module({
  controllers: [AvatarController],
  providers: [AvatarService],
  imports: [TypeOrmModule.forFeature([AvatarEntity])],
})
export class AvatarModule {}
