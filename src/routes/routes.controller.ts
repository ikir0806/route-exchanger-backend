import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CreateRouteDto } from './dto/create-route.dto';
import { RoutesService } from './routes.service';

@Controller('routes')
@ApiTags('routes')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @Get('findByLocation')
  findByLocation(@Query('location') location: string) {
    return this.routesService.findByLocation(location);
  }

  @Get('findByUser')
  findByUser(@Query('userId') userId: number) {
    console.log(userId);
    return this.routesService.findByUser(userId);
  }

  @Post('create')
  create(@Body() dto: CreateRouteDto, @Query('userId') userId: number) {
    return this.routesService.create(dto, userId);
  }
}
