import { ApiProperty } from '@nestjs/swagger';

export class CreateRouteDto {
  @ApiProperty({ default: 'Прогулка по Москве' })
  name: string;

  @ApiProperty({ default: 'Это описание маршрута' })
  description: string;

  @ApiProperty({ default: 'Москва, Россия' })
  location: string;

  @ApiProperty({ default: 'anonimous' })
  username: string;
}
