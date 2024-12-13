import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CreateRouteDto } from './dto/create-route.dto';
import { RouteService } from './route.service';

@Controller('route')
@ApiTags('route')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class RouteController {
  constructor(private readonly routeService: RouteService) {}

  @Get('findByLocation')
  findByLocation(@Query('location') location: string) {
    return this.routeService.findByLocation(location);
  }

  @Get('findByUser')
  findByUser(@Query('userId') userId: number) {
    return this.routeService.findByUser(userId);
  }

  @Post('create')
  create(@Body() dto: CreateRouteDto, @Query('userId') userId: number) {
    return this.routeService.create(dto, userId);
  }

  @Patch('addMap')
  addMap(
    @Query('routeId') routeId: number,
    @Query('mapFilename') mapFilename: string,
  ) {
    return this.routeService.addMap(mapFilename, routeId);
  }
}
