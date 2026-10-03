export class AuthService {
  login(email: string, password: string) {
    const valid = email && password;

    if (!valid) {
      return { success: false, message: 'Invalid credentials' };
    }

    return {
      success: true,
      user: {
        id: 'u-001',
        email,
        role: 'project_admin',
        name: 'Operations Admin',
        permissions: ['upload', 'review', 'edit', 'download'],
      },
      token: 'demo-token-for-blueprint-organizer',
    };
  }

  getRoles() {
    return [
      { code: 'super_admin', label: 'Super Admin', permissions: ['all'] },
      { code: 'project_admin', label: 'Project Admin', permissions: ['upload', 'review', 'edit', 'download', 'manage_users'] },
      { code: 'editor', label: 'Editor', permissions: ['upload', 'review', 'edit', 'download'] },
      { code: 'viewer', label: 'Viewer', permissions: ['view', 'download'] },
    ];
  }
}
