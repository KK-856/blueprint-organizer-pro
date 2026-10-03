# Error Report Feature

## Overview

Allow users without editing/reviewing permissions to report errors, issues, or data quality problems with drawings to administrators.

## Use Cases

1. **Data quality issues**: OCR recognition error, wrong extraction, missing metadata
2. **File problems**: Corrupted file, wrong format, duplicate upload
3. **Classification issues**: Wrong project, wrong category, wrong tags
4. **Missing information**: Missing drawing number, unclear date, incomplete data
5. **Urgent issues**: File urgently needs update, critical error found

## Architecture

### New Database Tables

```sql
-- Error reports from users
CREATE TABLE error_reports (
  id SERIAL PRIMARY KEY,
  drawing_id INT REFERENCES drawings(id) ON DELETE CASCADE,
  reporter_id INT REFERENCES users(id),
  report_type VARCHAR(50), -- ocr_error / classification_error / file_issue / missing_data / other
  severity VARCHAR(20), -- low / medium / high / critical
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  suggested_fix TEXT, -- optional: what the fix should be
  status VARCHAR(20), -- open / acknowledged / in_progress / resolved / rejected
  assigned_to INT REFERENCES users(id), -- admin assigned to review
  resolution TEXT, -- admin's response/explanation
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  resolved_at TIMESTAMP
);

-- Attach screenshots/images to error reports
CREATE TABLE error_report_attachments (
  id SERIAL PRIMARY KEY,
  report_id INT REFERENCES error_reports(id) ON DELETE CASCADE,
  file_path VARCHAR(1024),
  file_name VARCHAR(255),
  mime_type VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Track admin actions on reports
CREATE TABLE error_report_history (
  id SERIAL PRIMARY KEY,
  report_id INT REFERENCES error_reports(id) ON DELETE CASCADE,
  user_id INT REFERENCES users(id),
  action VARCHAR(50), -- created / assigned / acknowledged / updated / resolved / rejected
  old_status VARCHAR(20),
  new_status VARCHAR(20),
  comment TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### API Endpoints

```
POST /error-reports
  - Create new error report
  - Body: { drawing_id, report_type, severity, title, description, suggested_fix, attachments }
  - Auth: Any authenticated user

GET /error-reports
  - List error reports
  - Query params: status, report_type, severity, drawing_id, assigned_to
  - Auth: Admin/Project Admin can see all; others see only their own

GET /error-reports/:id
  - Get error report details
  - Auth: Reporter, assigned admin, or admin role

PATCH /error-reports/:id/status
  - Update status (admin only)
  - Body: { status, resolution, assigned_to }
  - Auth: Admin/Project Admin

POST /error-reports/:id/comment
  - Add comment to report (both user and admin can add)
  - Body: { comment }
  - Auth: Authenticated user

DELETE /error-reports/:id
  - Delete report (reporter or admin only)
  - Auth: Reporter or Admin
```

### Frontend Components

#### Error Report Button (Floating on Drawing Page)
```
┌─────────────────────────────┐
│ Drawing: Floor Plan A-01    │
│ Status: Pending Review      │
│                             │
│ [View File]                 │
│ [Download]                  │
│                             │
│ ┌─────────────────────────┐ │
│ │ Report Error / Issue 🚩 │ │ ← Visible to all users
│ └─���───────────────────────┘ │
└─────────────────────────────┘
```

#### Error Report Modal
```
Report Error to Administrators
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Type: [OCR Error ▼]
Severity: [High ▼]

Title: *
[ OCR incorrectly extracted revision number ]

Description: *
[ Detailed explanation of the error ]

Suggested Fix: (optional)
[ The correct revision should be R04 ]

Attachments: [Add screenshot/file]

[Cancel] [Submit Report]
```

#### Admin Dashboard - Error Reports
```
Error Reports Queue
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Filter: [Status ▼] [Type ▼] [Severity ▼]

| Drawing | Type | Severity | Status | Reported | Assigned To |
|---------|------|----------|--------|----------|-------------|
| A-01    | OCR  | High     | Open   | 2h ago   | [Unassigned]|
| MEP-01  | Class| Medium   | In Pr. | 1d ago   | Admin       |
| B-03    | File | Critical | Resolved| 3d ago  | Admin       |

[View Report] [Assign] [Resolve]
```

## Permission Rules

### Who Can Report
- Any authenticated user (viewer, editor, etc.)
- Cannot report on own account settings

### Who Can View Reports
- Super Admin: all reports
- Project Admin: reports for their projects
- Reporter: only their own reports
- Assigned Admin: only reports assigned to them
- Others: cannot access

### Who Can Resolve/Assign
- Super Admin: all reports
- Project Admin: reports for their projects

### Who Can Comment
- Assigned admin
- Reporter
- Project admin
- Super admin

## Workflow

### User Perspective
1. User views a drawing
2. Notices an error (wrong OCR, missing data, wrong category, etc.)
3. Clicks "Report Error" button
4. Fills in error form
5. Optionally adds screenshot/evidence
6. Submits report
7. Gets confirmation: "Report submitted, reference #REP-1234"
8. Can view report status in "My Reports" section

### Admin Perspective
1. Admin sees "Error Reports" in dashboard
2. Filters by status, type, severity
3. Reviews open reports
4. Can assign to self or another admin
5. Investigates the issue
6. Makes correction in the drawing
7. Updates report status to "Resolved"
8. Adds resolution comment
9. System notifies reporter

## Notification Strategy

### Email to Reporter
```
Status: Error Report Assigned
────────────────────────────
Your error report for "Floor Plan A-01" 
has been assigned to Admin User.

Reference: #REP-1234
Status: In Progress
Assigned to: Admin User
```

### Email to Admin (When Assigned)
```
New Error Report Assigned
──────────────────────────
Drawing: Floor Plan A-01 (A-01)
Type: OCR Error
Severity: High
Reporter: John Doe
Description: [excerpt]

[View Report] [Resolve]
```

### Dashboard Notification
- Toast notification when report is submitted
- Badge on admin dashboard showing open reports count
- Real-time updates if assigned or resolved

## Error Report Types

| Type | Description | Common Issues |
|------|-------------|---------------|
| ocr_error | OCR extraction failed or incorrect | Wrong numbers, garbled text, missed text |
| classification_error | Wrong project/category/tags | Misclassified, wrong project assigned |
| file_issue | File upload/format problem | Corrupted, wrong format, duplicate |
| missing_data | Missing or incomplete metadata | No drawing number, unclear date |
| other | Other issues | Custom problems |

## Severity Levels

| Level | Response Time | Description |
|-------|---------------|-------------|
| critical | < 2 hours | System breaking, data loss, security issue |
| high | < 24 hours | Major functionality broken, important data wrong |
| medium | < 3 days | Minor issues, incorrect info, incomplete |
| low | < 7 days | Cosmetic issues, suggestions, improvements |

## Analytics

Track:
- Total reports per project
- Most common error types
- Average resolution time
- Resolution rate
- User who reports most issues (feedback for user training)

Dashboard shows:
- Open reports by severity
- Unassigned reports count
- Reports by project
- Reports trending by type
