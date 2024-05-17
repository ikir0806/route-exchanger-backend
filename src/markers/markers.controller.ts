import { Controller } from '@nestjs/common';
import { MarkersService } from './markers.service';

@Controller('markers')
export class MarkersController {
  constructor(private readonly markersService: MarkersService) {}
}
