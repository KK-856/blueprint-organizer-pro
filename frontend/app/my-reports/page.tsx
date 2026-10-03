const myReports = [
  {
    id: 'REP-1001',
    drawing: 'Floor Plan A-01.pdf',
    type: 'OCR Error',
    severity: 'High',
    status: 'Open',
    createdAt: '2026-10-03',
  },
  {
    id: 'REP-1004',
    drawing: 'MEP-Schedule-01.png',
    type: 'Classification Error',
    severity: 'Medium',
    status: 'Resolved',
    createdAt: '2026-10-01',
  },
];

export default function MyReportsPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#f5f7fb', padding: 32, fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <header style={{ marginBottom: 24 }}>
          <p style={{ margin: 0, color: '#3b82f6', fontWeight: 700 }}>Blueprint Organizer Pro</p>
          <h1 style={{ margin: '8px 0 0', fontSize: 32 }}>My reports</h1>
        </header>

        <section style={{ background: 'white', borderRadius: 18, padding: 20, boxShadow: '0 6px 18px rgba(15, 23, 42, 0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18, flexWrap: 'wrap' }}>
            <h2 style={{ margin: 0 }}>Submitted issues</h2>
            <button style={{ background: '#2563eb', color: 'white', border: 'none', borderRadius: 10, padding: '10px 16px', cursor: 'pointer' }}>
              New report
            </button>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', color: '#475569', borderBottom: '1px solid #e2e8f0' }}>
                <th style={{ padding: '12px 8px' }}>Report ID</th>
                <th>Drawing</th>
                <th>Type</th>
                <th>Severity</th>
                <th>Status</th>
                <th>Submitted</th>
              </tr>
            </thead>
            <tbody>
              {myReports.map((report) => (
                <tr key={report.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 8px' }}>{report.id}</td>
                  <td>{report.drawing}</td>
                  <td>{report.type}</td>
                  <td>{report.severity}</td>
                  <td>
                    <span
                      style={{
                        padding: '6px 10px',
                        borderRadius: 999,
                        background: report.status === 'Resolved' ? '#dcfce7' : '#fef3c7',
                        color: report.status === 'Resolved' ? '#166534' : '#92400e',
                        fontSize: 12,
                        fontWeight: 700,
                      }}
                    >
                      {report.status}
                    </span>
                  </td>
                  <td>{report.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </main>
  );
}
