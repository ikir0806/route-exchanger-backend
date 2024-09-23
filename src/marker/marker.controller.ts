import { Body, Controller, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CreateMarkerDto } from '../marker/dto/create-marker.dto';
import { MarkerService } from './marker.service';

@Controller('marker')
@ApiTags('marker')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class MarkerController {
  constructor(private readonly markerService: MarkerService) {}

  @Post('create')
  create(@Body() dto: CreateMarkerDto, @Query('routeId') routeId: number) {
    return this.markerService.create(dto, routeId);
  }
}
