const reports = [
  {
    id: 'REP-1001',
    drawing: 'Floor Plan A-01.pdf',
    project: 'Green Tower',
    type: 'OCR Error',
    severity: 'High',
    status: 'Open',
    reporter: 'Project Viewer',
    assignedTo: 'Unassigned',
    description: 'The OCR extracted revision R01 instead of R02 and the floor plan was assigned to the wrong zone.',
    resolution: '',
  },
  {
    id: 'REP-1002',
    drawing: 'MEP-Schedule-01.png',
    project: 'North Hub',
    type: 'Classification Error',
    severity: 'Medium',
    status: 'In Progress',
    reporter: 'Design Reviewer',
    assignedTo: 'Admin Chen',
    description: 'The drawing was assigned to Green Tower but should belong to North Hub under MEP classification.',
    resolution: 'Review team is validating the correct project assignment and metadata.',
  },
];

export default function ReportDetailPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#f5f7fb', padding: 32, fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <header style={{ marginBottom: 24 }}>
          <p style={{ margin: 0, color: '#3b82f6', fontWeight: 700 }}>Blueprint Organizer Pro</p>
          <h1 style={{ margin: '8px 0 0', fontSize: 32 }}>Error report details</h1>
        </header>

        <section style={{ background: 'white', borderRadius: 18, padding: 24, boxShadow: '0 6px 18px rgba(15, 23, 42, 0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
            <div>
              <div style={{ color: '#64748b', fontSize: 12 }}>Report ID</div>
              <div style={{ fontSize: 28, fontWeight: 700 }}>{reports[0].id}</div>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button style={{ background: '#2563eb', color: 'white', border: 'none', borderRadius: 10, padding: '10px 16px', cursor: 'pointer' }}>Assign to admin</button>
              <button style={{ background: '#0f172a', color: 'white', border: 'none', borderRadius: 10, padding: '10px 16px', cursor: 'pointer' }}>Mark in progress</button>
              <button style={{ background: '#22c55e', color: 'white', border: 'none', borderRadius: 10, padding: '10px 16px', cursor: 'pointer' }}>Resolve</button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 24 }}>
            <div style={{ background: '#f8fafc', borderRadius: 12, padding: 16 }}>
              <div style={{ color: '#64748b', fontSize: 12 }}>Drawing</div>
              <div style={{ fontWeight: 700, marginTop: 8 }}>{reports[0].drawing}</div>
            </div>
            <div style={{ background: '#f8fafc', borderRadius: 12, padding: 16 }}>
              <div style={{ color: '#64748b', fontSize: 12 }}>Project</div>
              <div style={{ fontWeight: 700, marginTop: 8 }}>{reports[0].project}</div>
            </div>
            <div style={{ background: '#f8fafc', borderRadius: 12, padding: 16 }}>
              <div style={{ color: '#64748b', fontSize: 12 }}>Type</div>
              <div style={{ fontWeight: 700, marginTop: 8 }}>{reports[0].type}</div>
            </div>
            <div style={{ background: '#f8fafc', borderRadius: 12, padding: 16 }}>
              <div style={{ color: '#64748b', fontSize: 12 }}>Severity</div>
              <div style={{ fontWeight: 700, marginTop: 8 }}>{reports[0].severity}</div>
            </div>
            <div style={{ background: '#f8fafc', borderRadius: 12, padding: 16 }}>
              <div style={{ color: '#64748b', fontSize: 12 }}>Status</div>
              <div style={{ fontWeight: 700, marginTop: 8 }}>{reports[0].status}</div>
            </div>
            <div style={{ background: '#f8fafc', borderRadius: 12, padding: 16 }}>
              <div style={{ color: '#64748b', fontSize: 12 }}>Assigned to</div>
              <div style={{ fontWeight: 700, marginTop: 8 }}>{reports[0].assignedTo}</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div>
              <h3 style={{ marginBottom: 12 }}>Reporter</h3>
              <div style={{ background: '#f8fafc', borderRadius: 12, padding: 16 }}>{reports[0].reporter}</div>
            </div>
            <div>
              <h3 style={{ marginBottom: 12 }}>Resolution status</h3>
              <div style={{ background: '#f8fafc', borderRadius: 12, padding: 16 }}>{reports[0].resolution || 'Waiting for admin action'}</div>
            </div>
          </div>

          <div style={{ marginTop: 24 }}>
            <h3 style={{ marginBottom: 12 }}>Issue description</h3>
            <div style={{ background: '#f8fafc', borderRadius: 12, padding: 16, lineHeight: 1.7, color: '#334155' }}>
              {reports[0].description}
            </div>
          </div>

          <div style={{ marginTop: 24 }}>
            <h3 style={{ marginBottom: 12 }}>Admin notes</h3>
            <textarea
              rows={5}
              defaultValue="The drawing alignment and project assignment should be revalidated by project admin before final approval."
              style={{ width: '100%', padding: 16, borderRadius: 12, border: '1px solid #cbd5e1', resize: 'vertical' }}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
