export type DrawingRecord = {
  id: string;
  name: string;
  fileType: string;
  project: string;
  category: string;
  status: 'pending_review' | 'classified' | 'archived';
  drawingNumber: string | null;
  revision: string;
  uploadedAt: string;
  reviewedBy?: string;
  ocrText?: string;
};

export class DrawingsService {
  private records: DrawingRecord[] = [
    {
      id: 'D-1001',
      name: 'Floor Plan A-01.pdf',
      fileType: 'PDF',
      project: 'Green Tower',
      category: 'Architecture',
      status: 'pending_review',
      drawingNumber: 'A-01',
      revision: 'R02',
      uploadedAt: '2026-10-03T09:30:00.000Z',
      ocrText: 'Floor Plan A-01 Green Tower Revision R02 Electrical layout inspection',
    },
    {
      id: 'D-1002',
      name: 'MEP-Schedule-01.png',
      fileType: 'PNG',
      project: 'North Hub',
      category: 'MEP',
      status: 'classified',
      drawingNumber: 'MEP-01',
      revision: 'R01',
      uploadedAt: '2026-10-02T11:15:00.000Z',
      reviewedBy: 'admin@company.com',
      ocrText: 'MEP Schedule North Hub Cooling system Outlet positions',
    },
  ];

  list(project?: string) {
    if (!project) {
      return this.records;
    }

    return this.records.filter((record) => record.project === project);
  }

  getById(id: string) {
    return this.records.find((record) => record.id === id) ?? null;
  }

  review(payload: any) {
    const { id, category, project, drawingNumber, revision, reviewedBy } = payload;

    const found = this.records.find((record) => record.id === id);
    if (!found) {
      return { success: false, message: 'Drawing not found' };
    }

    found.category = category ?? found.category;
    found.project = project ?? found.project;
    found.drawingNumber = drawingNumber ?? found.drawingNumber;
    found.revision = revision ?? found.revision;
    found.status = 'classified';
    found.reviewedBy = reviewedBy ?? 'system';

    return { success: true, drawing: found };
  }
}
