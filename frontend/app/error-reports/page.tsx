const reports = [
  {
    id: 'REP-1001',
    drawing: 'Floor Plan A-01.pdf',
    type: 'OCR Error',
    severity: 'High',
    status: 'Open',
    user: 'Project Viewer',
    project: 'Green Tower',
    assignedTo: 'Unassigned',
  },
  {
    id: 'REP-1002',
    drawing: 'MEP-Schedule-01.png',
    type: 'Classification Error',
    severity: 'Medium',
    status: 'In Progress',
    user: 'Design Reviewer',
    project: 'North Hub',
    assignedTo: 'Admin Chen',
  },
  {
    id: 'REP-1003',
    drawing: 'Structural Beam Layout.pdf',
    type: 'Missing Data',
    severity: 'Low',
    status: 'Resolved',
    user: 'Site Engineer',
    project: 'Green Tower',
    assignedTo: 'Admin Wang',
  },
];

export default function ErrorReportsPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#f5f7fb', padding: 32, fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <header style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <div>
            <p style={{ margin: 0, color: '#3b82f6', fontWeight: 700 }}>Blueprint Organizer Pro</p>
            <h1 style={{ margin: '8px 0 0', fontSize: 32 }}>Error reports dashboard</h1>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button style={{ background: '#0f172a', color: 'white', border: 'none', borderRadius: 10, padding: '10px 16px', cursor: 'pointer' }}>
              Filter: All
            </button>
            <button style={{ background: '#2563eb', color: 'white', border: 'none', borderRadius: 10, padding: '10px 16px', cursor: 'pointer' }}>
              Export CSV
            </button>
          </div>
        </header>

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 24 }}>
          {[
            ['Open', '12'],
            ['In progress', '3'],
            ['Resolved', '26'],
            ['Critical', '2'],
          ].map(([label, value]) => (
            <div key={label} style={{ background: 'white', borderRadius: 16, padding: 20, boxShadow: '0 6px 18px rgba(15, 23, 42, 0.08)' }}>
              <div style={{ fontSize: 13, color: '#64748b' }}>{label}</div>
              <div style={{ marginTop: 8, fontSize: 28, fontWeight: 700 }}>{value}</div>
            </div>
          ))}
        </section>

        <section style={{ background: 'white', borderRadius: 18, padding: 20, boxShadow: '0 6px 18px rgba(15, 23, 42, 0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18, flexWrap: 'wrap' }}>
            <h2 style={{ margin: 0 }}>Open issues</h2>
            <span style={{ color: '#64748b', fontSize: 14 }}>Project admin view</span>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', color: '#475569', borderBottom: '1px solid #e2e8f0' }}>
                <th style={{ padding: '12px 8px' }}>Report</th>
                <th>Drawing</th>
                <th>Type</th>
                <th>Severity</th>
                <th>Status</th>
                <th>Assigned</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 8px' }}>
                    <strong>{report.id}</strong>
                    <div style={{ color: '#64748b', fontSize: 12 }}>{report.user}</div>
                  </td>
                  <td>{report.drawing}</td>
                  <td>{report.type}</td>
                  <td>
                    <span
                      style={{
                        padding: '6px 10px',
                        borderRadius: 999,
                        background: report.severity === 'High' ? '#fee2e2' : report.severity === 'Medium' ? '#fef3c7' : '#dcfce7',
                        color: report.severity === 'High' ? '#b91c1c' : report.severity === 'Medium' ? '#92400e' : '#166534',
                        fontSize: 12,
                        fontWeight: 700,
                      }}
                    >
                      {report.severity}
                    </span>
                  </td>
                  <td>{report.status}</td>
                  <td>{report.assignedTo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </main>
  );
}
