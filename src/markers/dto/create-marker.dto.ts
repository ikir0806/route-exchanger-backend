import { ApiProperty } from '@nestjs/swagger';

export class CreateMarkerDto {
  @ApiProperty({ default: 'Парк Горького' })
  name: string;

  @ApiProperty({ default: 'Это описание Парка Горького' })
  description: string;

  @ApiProperty({ default: '37.57440490722658,55.71043809956226' })
  coordinates: string;
}
