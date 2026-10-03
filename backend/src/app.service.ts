import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Blueprint Organizer Pro API is running';
  }
}
