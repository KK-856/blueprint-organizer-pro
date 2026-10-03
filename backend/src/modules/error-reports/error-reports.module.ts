import { Module } from '@nestjs/common';
import { PermissionsService } from '../permissions/permissions.service';
import { ErrorReportsController } from './error-reports.controller';
import { ErrorReportsService } from './error-reports.service';

@Module({
  imports: [],
  controllers: [ErrorReportsController],
  providers: [ErrorReportsService, PermissionsService],
  exports: [ErrorReportsService, PermissionsService],
})
export class ErrorReportsModule {}
