import { Body, Controller, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CreateMarkerDto } from './dto/create-marker.dto';
import { MarkersService } from './markers.service';

@Controller('markers')
@ApiTags('markers')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class MarkersController {
  constructor(private readonly markersService: MarkersService) {}

  @Post('create')
  create(@Body() dtos: CreateMarkerDto[], @Query('routeId') routeId: number) {
    return this.markersService.create(dtos, routeId);
  }
}
