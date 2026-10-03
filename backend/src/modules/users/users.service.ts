export class UsersService {
  list() {
    return [
      {
        id: 'u-001',
        name: 'Operations Admin',
        email: 'admin@company.com',
        role: 'project_admin',
        projects: ['Green Tower', 'North Hub'],
      },
      {
        id: 'u-002',
        name: 'Design Reviewer',
        email: 'reviewer@company.com',
        role: 'editor',
        projects: ['Green Tower'],
      },
      {
        id: 'u-003',
        name: 'Project Viewer',
        email: 'viewer@company.com',
        role: 'viewer',
        projects: ['North Hub'],
      },
    ];
  }

  setPermissions(payload: any) {
    return {
      success: true,
      message: 'Permissions updated',
      payload,
    };
  }
}
