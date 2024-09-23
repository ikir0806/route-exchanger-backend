import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ default: 19 })
  id: number;
  @ApiProperty({ default: 'kirill' })
  login: string;
  @ApiProperty({ default: 'это описание пользователя' })
  description: string;
}
