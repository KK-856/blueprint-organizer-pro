import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PermissionsService } from '../permissions/permissions.service';
import {
  CreateErrorReportDto,
  ErrorReportsService,
  UpdateErrorReportStatusDto,
} from './error-reports.service';

@Controller('error-reports')
export class ErrorReportsController {
  constructor(
    private readonly errorReportsService: ErrorReportsService,
    private readonly permissionsService: PermissionsService,
  ) {}

  @Post()
  createReport(@Body() dto: CreateErrorReportDto) {
    const role = dto.role ?? 'viewer';
    const canCreate = this.permissionsService.canCreateReport(role);

    if (!canCreate) {
      throw new ForbiddenException('User does not have permission to report errors');
    }

    if (!dto.title || !dto.description || !dto.reportType) {
      throw new BadRequestException('title, description, and reportType are required');
    }

    return this.errorReportsService.createReport(dto);
  }

  @Get()
  listReports(
    @Query('role') role: string,
    @Query('userId') userId: string,
    @Query('projectId') projectId?: string,
  ) {
    return this.errorReportsService.listReports(role as any, userId ?? 'u-guest', projectId);
  }

  @Get(':id')
  getReport(@Param('id') id: string, @Query('role') role: string, @Query('userId') userId: string) {
    return this.errorReportsService.getReport(id, (role ?? 'viewer') as any, userId ?? 'u-guest');
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateErrorReportStatusDto,
    @Query('role') role: string,
    @Query('userId') userId: string,
  ) {
    const normalizedRole = (role ?? 'viewer') as any;
    if (!this.permissionsService.canResolveReport(normalizedRole)) {
      throw new ForbiddenException('Only project admins and super admins can resolve reports');
    }

    return this.errorReportsService.updateStatus(id, dto, normalizedRole, userId ?? 'admin-1');
  }
}
