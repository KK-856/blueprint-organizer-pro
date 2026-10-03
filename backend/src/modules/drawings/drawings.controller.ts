import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { DrawingsService } from './drawings.service';

@Controller('drawings')
export class DrawingsController {
  constructor(private readonly drawingsService: DrawingsService) {}

  @Get('health')
  health() {
    return { status: 'ok' };
  }

  @Get()
  getAll(@Query('project') project?: string) {
    return this.drawingsService.list(project);
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.drawingsService.getById(id);
  }

  @Post('review')
  review(@Body() payload: any) {
    return this.drawingsService.review(payload);
  }
}
