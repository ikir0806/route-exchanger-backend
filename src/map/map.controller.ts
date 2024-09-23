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
import { MapService } from './map.service';
import { mapStorage } from './storage';

@Controller('map')
@ApiTags('map')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class MapController {
  constructor(private readonly mapService: MapService) {}

  @Get()
  find(@Query('routeId') routeId: number) {
    return this.mapService.find(routeId);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: mapStorage,
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
    return this.mapService.create(file, routeId);
  }

  @Delete()
  remove(@Query('routeId') routeId: number) {
    return this.mapService.remove(routeId);
  }
}
