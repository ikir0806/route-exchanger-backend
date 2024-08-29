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
import { MapsService } from './maps.service';
import { mapsStorage } from './storage';

@Controller('maps')
@ApiTags('maps')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class MapsController {
  constructor(private readonly mapsService: MapsService) {}

  @Get()
  find(@Query('routeId') routeId: number) {
    return this.mapsService.find(routeId);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: mapsStorage,
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
    @Query('routeId') routeId: number,
  ) {
    return this.mapsService.create(file, routeId);
  }

  @Delete()
  remove(@Query('routeId') routeId: number) {
    return this.mapsService.remove(routeId);
  }
}
