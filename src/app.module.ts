import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AvatarModule } from './avatar/avatar.module';
import { AvatarEntity } from './avatar/entities/avatar.entity';
import { ImageEntity } from './images/entities/image.entity';
import { ImagesModule } from './images/images.module';
import { MarkerEntity } from './markers/entities/marker.entity';
import { MarkersModule } from './markers/markers.module';
import { RouteEntity } from './routes/entities/route.entity';
import { RoutesModule } from './routes/routes.module';
import { UserEntity } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';

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
      ],
      synchronize: true,
    }),
    UsersModule,
    RoutesModule,
    MarkersModule,
    AuthModule,
    ImagesModule,
    AvatarModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
