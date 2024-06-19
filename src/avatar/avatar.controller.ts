import {
  Controller,
  Delete,
  Get,
  ParseFilePipe,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { AvatarService } from './avatar.service';
import { avatarStorage } from './storage';

@Controller('avatar')
@ApiTags('avatar')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AvatarController {
  constructor(private readonly avatarService: AvatarService) {}

  @Get()
  find(@Query('userId') userId: number) {
    return this.avatarService.find(userId);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: avatarStorage,
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  create(
    @UploadedFile(
      new ParseFilePipe({
        validators: [],
      }),
    )
    file: Express.Multer.File,
    @Query('userId') userId: number,
  ) {
    return this.avatarService.create(file, userId);
  }

  @Delete()
  remove(@Query('userId') userId: number) {
    return this.avatarService.remove(userId);
  }
}
