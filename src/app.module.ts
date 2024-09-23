import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AvatarModule } from './avatar/avatar.module';
import { AvatarEntity } from './avatar/entities/avatar.entity';
import { ImageEntity } from './image/entities/image.entity';
import { ImageModule } from './image/image.module';
import { MapEntity } from './map/entities/map.entity';
import { MapModule } from './map/map.module';
import { MarkerEntity } from './marker/entities/marker.entity';
import { MarkerModule } from './marker/marker.module';
import { RouteEntity } from './route/entities/route.entity';
import { RouteModule } from './route/route.module';
import { UserEntity } from './user/entities/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        UserEntity,
        RouteEntity,
        MarkerEntity,
        ImageEntity,
        AvatarEntity,
        MapEntity,
      ],
      synchronize: true,
    }),
    UserModule,
    RouteModule,
    MarkerModule,
    AuthModule,
    ImageModule,
    AvatarModule,
    MapModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
