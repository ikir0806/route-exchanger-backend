import {
  Controller,
  Delete,
  Get,
  ParseFilePipe,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UserId } from '../decorators/user-id.decorator';
import { ImageType } from './entities/image.entity';
import { ImagesService } from './images.service';
import { imageStorage } from './storage';

@Controller('images')
@ApiTags('images')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ImagesController {
  constructor(private readonly filesService: ImagesService) {}

  @Get()
  findAll(@UserId() userId: number, @Query('type') fileType: ImageType) {
    return this.filesService.findAll(userId, fileType);
  }

  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      // 10 - максимальное количество загружаемых файлов
      storage: imageStorage,
    }),
  )
  create(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [],
      }),
    )
    files: Express.Multer.File[],
    @Query('markerId') markerId: number,
  ) {
    return this.filesService.create(files, markerId);
  }

  @Delete()
  remove(@UserId() userId: number, @Query('ids') ids: string) {
    return this.filesService.remove(userId, ids);
  }
}
