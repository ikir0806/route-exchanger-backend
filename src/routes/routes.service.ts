import { Injectable } from '@nestjs/common';

@Injectable()
export class RoutesService {
  async findAll() {
    return console.log('Hello');
  }
}
