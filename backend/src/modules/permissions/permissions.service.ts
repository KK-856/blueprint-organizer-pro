import { Injectable, NotFoundException } from '@nestjs/common';

export type ErrorReportType =
  | 'ocr_error'
  | 'classification_error'
  | 'file_issue'
  | 'missing_data'
  | 'other';

export type ErrorReportSeverity = 'low' | 'medium' | 'high' | 'critical';
export type ErrorReportStatus = 'open' | 'in_progress' | 'resolved' | 'rejected';

export type UserRole = 'super_admin' | 'project_admin' | 'editor' | 'viewer' | 'downloader';

export interface CreateErrorReportDto {
  drawingId: string;
  reporterId: string;
  reporterName?: string;
  role?: UserRole;
  reportType: ErrorReportType;
  severity: ErrorReportSeverity;
  title: string;
  description: string;
  suggestedFix?: string;
  attachments?: Array<{ fileName: string; path: string; mimeType?: string }>;
  projectId?: string;
}

export interface UpdateErrorReportStatusDto {
  status: ErrorReportStatus;
  assignedTo?: string;
  resolution?: string;
}

export interface ErrorReport {
  id: string;
  drawingId: string;
  reporterId: string;
  reporterName: string;
  projectId?: string;
  reportType: ErrorReportType;
  severity: ErrorReportSeverity;
  title: string;
  description: string;
  suggestedFix?: string;
  status: ErrorReportStatus;
  assignedTo?: string;
  resolution?: string;
  attachments: Array<{ fileName: string; path: string; mimeType?: string }>;
  createdAt: string;
  updatedAt: string;
}

@Injectable()
export class ErrorReportsService {
  private reports: ErrorReport[] = [
    {
      id: 'REP-1001',
      drawingId: 'D-1001',
      reporterId: 'u-003',
      reporterName: 'Project Viewer',
      projectId: 'p-1',
      reportType: 'ocr_error',
      severity: 'high',
      title: 'OCR extracted wrong revision number',
      description: 'The system detected revision R01 instead of R02 for Floor Plan A-01.',
      suggestedFix: 'Correct revision to R02 and validate the extraction text.',
      status: 'open',
      attachments: [],
      createdAt: '2026-10-03T10:15:00.000Z',
      updatedAt: '2026-10-03T10:15:00.000Z',
    },
    {
      id: 'REP-1002',
      drawingId: 'D-1002',
      reporterId: 'u-002',
      reporterName: 'Design Reviewer',
      projectId: 'p-2',
      reportType: 'classification_error',
      severity: 'medium',
      title: 'Drawing was assigned to wrong project',
      description: 'MEP Schedule should be under North Hub, not Green Tower.',
      suggestedFix: 'Move drawing to project North Hub and update category to MEP.',
      status: 'in_progress',
      assignedTo: 'admin-1',
      attachments: [],
      createdAt: '2026-10-03T08:40:00.000Z',
      updatedAt: '2026-10-03T09:10:00.000Z',
    },
  ];

  createReport(dto: CreateErrorReportDto): ErrorReport {
    const report: ErrorReport = {
      id: `REP-${Date.now().toString().slice(-6)}`,
      drawingId: dto.drawingId,
      reporterId: dto.reporterId,
      reporterName: dto.reporterName ?? 'User',
      projectId: dto.projectId,
      reportType: dto.reportType,
      severity: dto.severity,
      title: dto.title,
      description: dto.description,
      suggestedFix: dto.suggestedFix,
      status: 'open',
      attachments: dto.attachments ?? [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.reports.unshift(report);
    return report;
  }

  listReports(role: UserRole | string, userId: string, projectId?: string): ErrorReport[] {
    const normalizedRole = (role ?? 'viewer') as UserRole;

    if (normalizedRole === 'super_admin' || normalizedRole === 'project_admin') {
      return this.reports.filter((report) => (projectId ? report.projectId === projectId : true));
    }

    return this.reports.filter((report) => report.reporterId === userId);
  }

  getReport(id: string, role: UserRole | string, userId: string): ErrorReport {
    const report = this.reports.find((item) => item.id === id);
    if (!report) {
      throw new NotFoundException(`Error report ${id} not found`);
    }

    const normalizedRole = (role ?? 'viewer') as UserRole;
    if (normalizedRole === 'super_admin' || normalizedRole === 'project_admin' || report.reporterId === userId) {
      return report;
    }

    throw new NotFoundException(`Error report ${id} is not accessible to this user`);
  }

  updateStatus(
    id: string,
    dto: UpdateErrorReportStatusDto,
    role: UserRole | string,
    userId: string,
  ): ErrorReport {
    const report = this.reports.find((item) => item.id === id);
    if (!report) {
      throw new NotFoundException(`Error report ${id} not found`);
    }

    const normalizedRole = (role ?? 'viewer') as UserRole;
    if (!['super_admin', 'project_admin'].includes(normalizedRole)) {
      throw new NotFoundException('Only admins can update report status');
    }

    report.status = dto.status;
    report.assignedTo = dto.assignedTo ?? report.assignedTo ?? userId;
    report.resolution = dto.resolution ?? report.resolution;
    report.updatedAt = new Date().toISOString();
    return report;
  }
}
